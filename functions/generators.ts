import { faker } from '@faker-js/faker';

export function generateShoppingTask(): string {
  const actions = ['Buy', 'Get', 'Pick up'];
  const drinks = ['milk', 'soda', 'juice', 'water', 'coffee', 'tea'];
  const food = ['bread', 'eggs', 'cheese', 'apples', 'chicken', 'pasta'];
  const household = ['detergent', 'toilet paper', 'toothpaste', 'shampoo'];

  const allItems = [...drinks, ...food, ...household];
  return `${faker.helpers.arrayElement(actions)} ${faker.helpers.arrayElement(allItems)}`;
}

export function generateMultipleTasks(count: number): string[] {
  const tasks: string[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push(generateShoppingTask());
  }
  return tasks;
}
