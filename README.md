# Playwright TodoMVC Tests

Automated UI tests written in Playwright for the [TodoMVC](https://todomvc.com/examples/react-redux/dist/#/) React + Redux example app.

## Structure

- `page-objects/`: Contains `PageManager` and `TodoPage` classes
- `tests/`: Contains test files organized by feature (add, delete, filter, etc.)

## Technologies Used

- [Playwright](https://playwright.dev/)
- [Faker.js](https://github.com/faker-js/faker) for random task generation

## Useful Commands

```bash
npx playwright test         # Run all tests
npx playwright show-report # Open the HTML report
