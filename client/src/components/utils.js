import { style } from 'styled-system';

// eslint-disable-next-line
export function truncate(width = 'auto') {
    return `
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overlow: ellipsis;
      width: ${width};
  `;
}

export const hoverColor = style({
    prop: 'hoverColor',
    cssProperty: 'color',
    key: 'colors',
});

export const zIndex = style({
    prop: 'zIndex',
    cssProperty: 'z-index',
    key: 'zIndex',
});

export const flexWrap = style({
    prop: 'flexWrap',
    cssProperty: 'flex-wrap',
});

const getProgressStepsFromStep = (index, progressSteps) =>
    progressSteps.slice(index - 1);

const getProgressStepsWithNumbers = progressSteps =>
    progressSteps.map((step, index2) => `${index2 + 1} ${step}`);

export const getProgressBarProps = ({
    startStep = 1,
    currentStep,
    progressSteps,
}) => {
    return {
        step:
            getProgressStepsFromStep(startStep, progressSteps).indexOf(
                currentStep
            ) + 1,
        steps: getProgressStepsWithNumbers(
            getProgressStepsFromStep(startStep, progressSteps)
        ),
        percent:
            100 / getProgressStepsFromStep(startStep, progressSteps).length,
    };
};
