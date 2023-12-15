import { ComponentRegistry } from 'mystique/registry/ComponentRegistry';
import { Hello } from './components/_examples/Hello';
import { Orders } from './components/v2/ordermanagement/Orders';
import { Analytic } from './components/dashboard/analytics/Analytics';

ComponentRegistry.register(['fc.hello'], Hello, {category: 'content'});
ComponentRegistry.register(['fc.order.v2'], Orders, {category: 'content'});
ComponentRegistry.register(['fc.dashboard.analytics'], Analytic, {category: 'content'});