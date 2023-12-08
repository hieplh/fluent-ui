import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';

/**
 * Converts a GraphQL document node back to a query string
 *
 * @param doc The GraphQL document node
 */
export const parse = (doc: DocumentNode) => print(doc);