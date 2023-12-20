import { ComponentRegistry } from 'mystique/registry/ComponentRegistry';
import { Hello } from './components/_examples/Hello';
import { Orders } from './components/order_management/orders/v2/Orders';
import { Analytic } from './components/dashboard/analytics/Analytics';
import { CountStandardProduct } from './components/others/standard_products/count/CountStandardProducts';
import { CountVariantProduct } from './components/others/variant_products/count/CountVariantProducts';

ComponentRegistry.register(['fc.hello'], Hello, {category: 'content'});
ComponentRegistry.register(['fc.order.v2'], Orders, {category: 'content'});
ComponentRegistry.register(['fc.dashboard.analytics'], Analytic, {category: 'content'});
ComponentRegistry.register(['fc.product.standard.count'], CountStandardProduct, {category: 'content'});
ComponentRegistry.register(['fc.product.variant.count'], CountVariantProduct, {category: 'content'});