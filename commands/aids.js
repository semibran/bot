module.exports = function aids(text, offset) {
  offset = offset ? 1 : 0
  var result = ''
  for (var i = text.length; i--;) {
    var char = text[i]
    result = (i % 2 === offset ? char.toLowerCase() : char.toUpperCase()) + result
  }
  return result
}
