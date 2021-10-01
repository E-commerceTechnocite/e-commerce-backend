import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import * as faker from 'faker';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { Country } from '@app/product/entities/country.entity';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';

@Injectable()
export class ProductFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>,
    private readonly logger: ConsoleLogger,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(Tax)
    private readonly taxRepo: Repository<Tax>,
    @InjectRepository(TaxRule)
    private readonly taxRuleRepo: Repository<TaxRule>,
    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepo: Repository<TaxRuleGroup>,
  ) {}

  async load() {
    const categories: ProductCategory[] = [];
    const products: Product[] = [];

    // Ajout des catégories
    for (let i = 0; i < 6; i++) {
      categories.push({
        label: faker.commerce.productAdjective(),
      });
    }
    const savedCategories: ProductCategory[] = await this.categoryRepo.save(
      categories,
    );

    // Ajout des TaxRuleGroups
    const taxRuleGroups: TaxRuleGroup[] = [];
    for (let i = 0; i < 8; i++) {
      taxRuleGroups.push({
        name: faker.commerce.productMaterial(),
      });
    }
    const savedTaxRuleGroups: TaxRuleGroup[] = await this.taxRuleGroupRepo.save(
      taxRuleGroups,
    );

    // Ajout des Countries
    const countries: Country[] = [];
    for (let i = 0; i < 10; i++) {
      countries.push({
        name: faker.address.country(),
        code: faker.address.countryCode(),
      });
    }
    const savedCountries: Country[] = await this.countryRepo.save(countries);

    // Ajout des Taxes
    const taxes: Tax[] = [];
    for (let i = 0; i < 10; i++) {
      taxes.push({
        rate: parseFloat(faker.commerce.price(1, 30, 2)),
      });
    }
    const savedTaxes: Tax[] = await this.taxRepo.save(taxes);

    // Ajout des TaxRules
    const taxRules: TaxRule[] = [];
    for (let i = 0; i < 20; i++) {
      taxRules.push({
        zipCode: faker.address.zipCode(),
        behavior: 1,
        description: faker.random.words(20),
        country:
          savedCountries[Math.floor(Math.random() * savedCountries.length)],
        tax: savedTaxes[Math.floor(Math.random() * savedTaxes.length)],
        taxRuleGroup:
          savedTaxRuleGroups[
            Math.floor(Math.random() * savedTaxRuleGroups.length)
          ],
      });
    }
    await this.taxRuleRepo.save(taxRules);

    // Ajout des produits
    for (let i = 0; i < 50; i++) {
      products.push({
        reference: faker.random.alphaNumeric(10),
        title: faker.commerce.product(),
        price: parseFloat(faker.commerce.price(1, 100, 2)),
        quantity: Math.floor(Math.random() * 10),
        description: faker.random.words(50),
        category:
          savedCategories[Math.floor(Math.random() * savedCategories.length)],
        taxRuleGroup:
          savedTaxRuleGroups[
            Math.floor(Math.random() * savedTaxRuleGroups.length)
          ],
      });
    }
    await this.productRepo.save(products);
    this.logger.log('Categories and Products added');
  }

  async clean() {
    await this.taxRuleRepo.delete({});
    await this.productRepo.delete({});
    await this.categoryRepo.delete({});
    await this.countryRepo.delete({});
    await this.taxRepo.delete({});
    await this.taxRuleGroupRepo.delete({});
    this.logger.log('Categories and Products deleted');
  }
}
