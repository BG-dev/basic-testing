import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const expectedValues = {
    value: 'Alex',
    next: {
      value: 'Nick',
      next: {
        value: 'Liza',
        next: {
          value: 'Mike',
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  };
  const people = ['Alex', 'Nick', 'Liza', 'Mike'];
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(people)).toStrictEqual(expectedValues);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(people)).toMatchSnapshot();
  });
});
