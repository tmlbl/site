var buzzwords = [
  'cloud', 'big data', 'asynchronous',
  'SaaS', 'agile', 'BDD', 'agnostic',
  'analytics', 'responsive', 'open source',
  'thin client', 'RESTful', 'full stack',
  'scalable', 'enterprise', 'distributed',
  'hadoop', 'data visualization', 'freemium',
  'CMS', 'data mining', 'modular', 'mobile',
  'noSQL', 'SPA', 'PaaS', 'ecosystem',
  'multi-core', 'benchmarking', 'data-driven'
];

function makeWord (el, cap) {
  var word = buzzwords[Math.floor(Math.random()*buzzwords.length)];
  if (cap) {
    var spaceCheck = new RegExp(' ');
    var dashCheck = new RegExp('-');
    if (word.search(spaceCheck) > 0) {
      word = word.split(' ');
      for (var i = word.length - 1; i >= 0; i--) {
        word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
      };
      word = word.join(' ');
    } else if (word.search(dashCheck) > 0) {
      word = word.split('-');
      for (var i = word.length - 1; i >= 0; i--) {
        word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
      };
      word = word.join('-');
    } else {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  var text = el.text();
  var arr = text.split(' ');
  var cut = Math.floor(Math.random()*arr.length);
  arr.splice(cut, 0, word);
  el.text(arr.join(' '));
}

$('#buzz').click(function () {
  $('h1').each(function () {
    makeWord($(this), true);
  });
  $('p').each(function () {
    makeWord($(this));
  });
});