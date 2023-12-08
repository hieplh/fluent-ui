import { ComponentRegistry } from 'mystique/registry/ComponentRegistry';
import { Hello } from './components/_examples/Hello';
import { Orders } from './components/v2/ordermanagement/Orders';

ComponentRegistry.register(['fc.hello'], Hello, {category: 'content'});
ComponentRegistry.register(['fc.order.v2'], Orders, {category: 'content'});