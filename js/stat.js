'use strict';

var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  X_POSITION: 100,
  Y_POSITION: 10,
  SHADOW_GAP: 10
};

var chartParams = {
  COLUMN_GAP: 50,
  COLUMN_WIDTH: 40,
  COLUMN_HEIGHT: 150
};

var textParams = {
  text: 'Ура вы победили!\nСписок результатов:',
  fontStyle: '16px PT Mono',
  lineHeight: 25,
  color: '#000',
  x: cloudParams.X_POSITION + chartParams.COLUMN_GAP,
  y: cloudParams.Y_POSITION + chartParams.COLUMN_GAP / 2
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = Math.max.apply(null, arr);
  return maxElement;
};

var renderText = function (ctx, x, y, text, font, color, lineHeight) {
  var lines = text.split('\n');
  ctx.font = font;
  ctx.fillStyle = color;
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + lineHeight * i);
  }
};

var renderResults = function (ctx, color, number, index, maxTime) {
  ctx.fillStyle = color;
  ctx.fillText(Math.floor(number), cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * index, cloudParams.HEIGHT - ((chartParams.COLUMN_HEIGHT * number) / maxTime) - cloudParams.Y_POSITION * 4);
};

var getHSLColor = function () {
  return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)'
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudParams.X_POSITION + cloudParams.SHADOW_GAP, cloudParams.Y_POSITION + cloudParams.SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudParams.X_POSITION, cloudParams.Y_POSITION, '#fff');

  renderText(ctx, textParams.x, textParams.y, textParams.text, textParams.fontStyle, textParams.color, textParams.lineHeight);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var saturationPersntage = Math.floor(Math.random() * 100);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * i, cloudParams.HEIGHT - cloudParams.Y_POSITION);

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getHSLColor();

    ctx.fillRect(cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * i, cloudParams.HEIGHT - cloudParams.Y_POSITION * 3, chartParams.COLUMN_WIDTH, -((chartParams.COLUMN_HEIGHT * times[i]) / maxTime));

    renderResults(ctx, '#000', times[i], i, maxTime);
  }
};
