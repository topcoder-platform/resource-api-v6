// utils/progressLogger.js

function createSimpleProgressBar(totalSteps) {
  let currentStep = 0;
  let lastPercentage = -1;

  return {
    tick: () => {
      currentStep++;
      const percentage = Math.floor((currentStep / totalSteps) * 100);

      if (percentage !== lastPercentage) {
        lastPercentage = percentage;
        const barWidth = 40;
        const filled = Math.floor((percentage / 100) * barWidth);
        const empty = barWidth - filled;
        const bar = '█'.repeat(filled) + '░'.repeat(empty);

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Progress: [${bar}] ${percentage}%`);
      }
    },
    done: () => {
      process.stdout.write('\n');
    }
  };
}

module.exports = {
  createSimpleProgressBar
};
