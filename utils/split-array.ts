export function splitArray<T>(input: T[], spacing: number) {
  var output = [];
  for (var i = 0; i < input.length; i += spacing) {
    output[output.length] = input.slice(i, i + spacing);
  }
  return output;
}
