'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var COLUMN_GAP = 50;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + COLUMN_GAP, CLOUD_Y + COLUMN_GAP / 2);
  ctx.fillText('Cписок результатов:', CLOUD_X + COLUMN_GAP, CLOUD_Y + COLUMN_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y * 1);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y * 3, BAR_WIDTH, -((barHeight * times[i]) / maxTime));
    } else {
    ctx.fillStyle = `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`;
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y * 3, BAR_WIDTH, -((barHeight * times[i]) / maxTime));
   }
  }

 for (var i = 0; i < times.length; i++) {
  ctx.fillStyle = '#000';
  ctx.fillText(Math.floor(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - ((barHeight * times[i]) / maxTime) - CLOUD_Y * 4);
 };
}
