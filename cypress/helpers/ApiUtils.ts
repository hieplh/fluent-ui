export function parseWorkflow(
  workflow: any,
  version: string,
  clientId: string,
  retailerId: number,
): any {
  let stringified = JSON.stringify(workflow);
  stringified = stringified.replace(
    /{{users.retailer.id}}/g,
    retailerId.toString(),
  );
  stringified = stringified.replace(/{{version}}/g, version.toString());
  stringified = stringified.replace(/{{client.id}}/g, clientId);
  return JSON.parse(stringified);
}
