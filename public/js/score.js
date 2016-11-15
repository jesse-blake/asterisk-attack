var asteriskAttack = (function(aa) {

  aa.updateScore = function() {
    $('#score').html(buildScore(aa.stats.score));
  };

  // Convert game score digits to three-line ascii art representations.
  function buildScore(n) {
    var i
      , result
      , started = false
      , digits = []
      , number = ['', '', ''];

    var parts = [
      ['__ ','/ /','/_/'], // 0 (top, mid, bot)
      [' ','/','/'],          // 1
      ['__ ','__/','/__'], // ...
      ['__ ','__/','__/'],
      ['   ','/_/','  /'],
      ['__ ','/_ ','__/'],
      ['__ ','/_ ','/_/'],
      ['__ ','  /','  /'],
      ['__ ','/_/','/_/'],
      ['__ ','/_/','__/'], // 9
    ];

    if (!n) { // Build and return number zero.
      number[0] = parts[0][0];
      number[1] = parts[0][1];
      number[2] = parts[0][2];
    }
    else { // Build and return integers > 0;
      while(n > 0) {
        number[0] = number[0] ? parts[n % 10][0] + ' ' + number[0] : parts[n % 10][0];
        number[1] = number[1] ? parts[n % 10][1] + ' ' + number[1] : parts[n % 10][1];
        number[2] = number[2] ? parts[n % 10][2] + ' ' + number[2] : parts[n % 10][2];
        n = parseInt(n / 10);
        started = true;
      }
    }

    // Add 'SCORE'.
    number[0] = '  __ __ __ __ __   ' + number[0];
    number[1] = '  /_ /  / //_//_   ' + number[1];
    number[2] = '  __//_ /_// \\/__  ' + number[2]; // Backslash is backslash escaped.

    // Line up the lines correctly.
    number[0] = '  ' + number[0] + '';
    number[1] = ' ' + number[1] + ' ';
    number[2] = '' + number[2] + '  ';

    // Convert spaces to non-breaking space html entities.
    for (i = 0; i < 3; i++) {
      number[i] = number[i].replace(/ /g, '&nbsp;');
    }

    // Wrap with html.
    result = '<span style="color:deeppink;">' + number[0] + '</span><br>'
           + '<span style="color:hotpink;">' + number[1] + '</span><br>'
           + '<span style="color:fuchsia;">' + number[2] + '</span><br>';

    return result;
  }

  return aa;
  
})(asteriskAttack);

