const capitalize = (str: string): string => {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const shuffleArray = <T> (array: T[]): T[] => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const splitDescription = (description: string, maxLength = 100): string[] => {
  const sentences: string[] = description.split('.')
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);

  const paragraphs: string[] = [];
  let paragraph = '';

  sentences.forEach((sentence) => {
    if (paragraph.length + sentence.length > maxLength) {
      paragraphs.push(paragraph.trim());
      paragraph = '';
    }
    paragraph += `${sentence }. `;
  });
  if (paragraph.trim()) {
    paragraphs.push(paragraph.trim());
  }

  return paragraphs;
};


export {capitalize, shuffleArray, splitDescription};
