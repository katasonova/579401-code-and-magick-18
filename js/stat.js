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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudParams.X_POSITION + cloudParams.SHADOW_GAP, cloudParams.Y_POSITION + cloudParams.SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudParams.X_POSITION, cloudParams.Y_POSITION, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', cloudParams.X_POSITION + chartParams.COLUMN_GAP, cloudParams.Y_POSITION + chartParams.COLUMN_GAP / 2);
  ctx.fillText('Cписок результатов:', cloudParams.X_POSITION + chartParams.COLUMN_GAP, cloudParams.Y_POSITION + chartParams.COLUMN_GAP);

  var maxTime = Math.max(...times);

  for (var i = 0; i < names.length; i++) {
    var saturationPersntage = Math.floor(Math.random() * 100);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * i, cloudParams.HEIGHT - cloudParams.Y_POSITION * 1);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * i, cloudParams.HEIGHT - cloudParams.Y_POSITION * 3, chartParams.COLUMN_WIDTH, -((chartParams.COLUMN_HEIGHT * times[i]) / maxTime));
    } else {
    // ctx.fillStyle = `hsl(240, ${Math.floor(Math.random() * 100)}%, 50%)`;
      ctx.fillStyle = 'hsl(240, ' + saturationPersntage + '%, 50%)';
      ctx.fillRect(cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * i, cloudParams.HEIGHT - cloudParams.Y_POSITION * 3, chartParams.COLUMN_WIDTH, -((chartParams.COLUMN_HEIGHT * times[i]) / maxTime));
    }
  }

  for (var j = 0; j < times.length; j++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[j]), cloudParams.X_POSITION + chartParams.COLUMN_GAP + (chartParams.COLUMN_GAP + chartParams.COLUMN_WIDTH) * j, cloudParams.HEIGHT - ((chartParams.COLUMN_HEIGHT * times[j]) / maxTime) - cloudParams.Y_POSITION * 4);
  }
};
