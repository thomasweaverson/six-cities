import { lorem } from 'faker';
import { splitDescription, capitalize } from './common-utils';


describe('Function: capitalize', () => {
  it('преобразует первую букву строки в заглавную', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('возвращает пустую строку, если входная строка пустая', () => {
    expect(capitalize('')).toBe('');
  });

  it('корректно обрабатывает строки, начинающиеся с пробела', () => {
    expect(capitalize(' hello')).toBe(' hello');
  });

  it('не изменяет первую букву, если она уже заглавная', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('корректно обрабатывает строки, состоящие из одного символа', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('корректно обрабатывает строки, начинающиеся с неалфавитных символов', () => {
    expect(capitalize('!hello')).toBe('!hello');
    expect(capitalize('123hello')).toBe('123hello');
  });
});


describe('Function:splitDescription', () => {
  it('разбивает текст на предложения с учетом ограничения длины', () => {
    const description = 'Это первое предложение. Это второе предложение. Это третье предложение, оно длинное.';
    const maxLength = 50;

    const result = splitDescription(description, maxLength);

    expect(result).toEqual([
      'Это первое предложение. Это второе предложение.',
      'Это третье предложение, оно длинное.',
    ]);
  });

  it('возвращает пустой массив для пустой строки', () => {
    const result = splitDescription('');
    expect(result).toEqual([]);
  });

  it('корректно обрабатывает длинные тексты, сгенерированные Faker', () => {
    const longText = lorem.paragraphs(10); // Генерация случайного текста из 10 параграфов
    const maxLength = 200;

    const result = splitDescription(longText, maxLength);

    // Проверяем, что каждая строка в результате не превышает maxLength
    result.forEach((paragraph) => {
      expect(paragraph.length).toBeLessThanOrEqual(maxLength + 1);
    });
  });

  it('обрабатывает текст без точек корректно', () => {
    const description = lorem.words(20); // Генерация случайной строки без точек
    const result = splitDescription(description);

    // Проверяем, что результат содержит единственную строку с добавленной точкой
    expect(result).toEqual([`${description}.`]);
  });

  it('корректно обрабатывает случайные данные с пробелами и символами', () => {
    const description = `   ${lorem.sentence()}   ${lorem.sentence()}   `;
    const maxLength = 100;

    const result = splitDescription(description, maxLength);

    // Проверяем, что пробелы были обрезаны
    result.forEach((paragraph) => {
      expect(paragraph.trim()).toBe(paragraph);
    });
  });

  it('генерирует корректные параграфы для текста с повторяющимися предложениями', () => {
    const sentence = lorem.sentence();
    const description = `${sentence}. `.repeat(10); // Повторяем одно предложение
    const maxLength = 50;

    const result = splitDescription(description, maxLength);

    // Проверяем, что каждый элемент массива либо меньше maxLength, либо содержит не более одной точки
    result.forEach((paragraph) => {
      expect(paragraph.length <= maxLength || (paragraph.match(/\./g)?.length || 0) <= 1).toBe(true);
    });
  });
});
