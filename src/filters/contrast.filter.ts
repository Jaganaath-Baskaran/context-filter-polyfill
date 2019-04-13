import { Filter } from '../types/filter.type';
import { normalizeNumberPercentage } from '../utils/filter.utils';

export const contrast: Filter = (context, brightness = '0') => {
  let amount = normalizeNumberPercentage(brightness);
  console.log('contrast', amount)

  // do not manipulate without proper amount
  if (amount <= 1) {
    return context;
  }

  const { height, width } = context.canvas;
  const { data } = context.getImageData(0, 0, width, height);
  const { length } = data;

  // in rgba world, every
  // n * 4 is red,
  // n * 4 + 1 green and
  // n * 4 + 2 is blue
  // the fourth can be skipped as it's the alpha channel
  // https://gist.github.com/jonathantneal/2053866
  for (let i = 0; i < length; i += 4) {
    data[i + 0] = ((((data[i + 0] / 255) - .5) * amount) + .5) * 255;
    data[i + 1] = ((((data[i + 1] / 255) - .5) * amount) + .5) * 255;
    data[i + 2] = ((((data[i + 2] / 255) - .5) * amount) + .5) * 255;
  }

  return context;
};
