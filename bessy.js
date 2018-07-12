var fs = require('fs');

var bessy = new Object();
bessy.width = '100';
bessy.height = '100';
bessy.fill = '#000000';
bessy.stroke = '#202020';
bessy.strokewidth = "10";
bessy.cap = 'butt';
bessy.join = 'bevel';


bessy.compile = function(code){
  var lineNumber = 0;
  svgcode = '';
  for(lineNumber = 0;lineNumber<code.length;lineNumber++){
    line = code[lineNumber];
    splitPos = line.indexOf(' ');
    if(splitPos!=-1 || line[0]=='#' || line==''){
      command = line.slice(0,splitPos).trim();
      args = line.slice(splitPos+1).trim();

      if(command == 'width'){
        bessy.width = args;
      }
      else if(command == 'height'){
        bessy.height = args;
      }
      else if(command == 'stroke'){
        bessy.stroke = args;
      }
      else if(command == 'strokewidth'){
        bessy.strokewidth = args;
      }
      else if(command == 'fill'){
        bessy.fill = args;
      }
      else if(command == 'cap'){
        bessy.cap = args;
      }
      else if(command == 'join'){
        bessy.join = args;
      }
      else if(command == 'line'){
        svgcode += bessy.line(args,lineNumber+1);
      }
      else if(command == 'rect'){
        svgcode += bessy.rect(args,lineNumber+1);
      }
      else if(command == 'circle'){
        svgcode += bessy.circle(args,lineNumber+1);
      }
      else {

      }

    }
    else{
      throw `line ${lineNumber+1}: invalid line`;
    }
  }
  svgcode = `<svg width='${bessy.width}' height='${bessy.height}' xmlns="http://www.w3.org/2000/svg" version="1.1">` + svgcode + '\n</svg>';
  return svgcode;
}
bessy.line = function(args,lineNumber){
  args = args.split(' ');
  if(args.length==4){
    return `\n<line x1='${args[0]}' y1='${args[1]}' x2='${args[2]}' y2='${args[3]}' stroke='${bessy.stroke}' stroke-width='${bessy.strokewidth}' stroke-linecap='${bessy.cap}' />`
  }
  else{
    throw `line ${lineNumber}: invalid number of arguments for line`;
  }
}
bessy.rect = function(args,lineNumber){
  args = args.split(' ');
  if(args.length==4){
    return `\n<rect x='${args[0]}' y='${args[1]}' width='${args[2]-args[0]}' height='${args[3]-args[1]}' fill='${bessy.fill}' stroke='${bessy.stroke}' stroke-width='${bessy.strokewidth}' />`;
  }
  else if(args.length==5){
    return `\n<rect x='${args[0]}' y='${args[1]}' width='${args[2]-args[0]}' height='${args[3]-args[1]}' rx='${args[4]}' ry='${args[4]}' fill='${bessy.fill}' stroke='${bessy.stroke}' stroke-width='${bessy.strokewidth}' />`;
  }
  else if(args.length==6){
    return `\n<rect x='${args[0]}' y='${args[1]}' width='${args[2]-args[0]}' height='${args[3]-args[1]}' rx='${args[4]}' ry='${args[5]}' fill='${bessy.fill}' stroke='${bessy.stroke}' stroke-width='${bessy.strokewidth}' />`;
  }
  else{
    throw `line ${lineNumber}: invalid number of arguments for rect`;
  }
}
bessy.circle = function(args,lineNumber){
  args = args.split(' ');
  if(args.length==3){
    return `\n<circle cx='${args[0]}' cy='${args[1]}' r='${args[2]}' fill='${bessy.fill}' stroke='${bessy.stroke}' stroke-width='${bessy.strokewidth}' />`
  }
  else{
    throw `line ${lineNumber}: invalid number of arguments for circle`;
  }
}

fs.readFile(process.argv[2],'utf8',function(err,data){
  console.log(bessy.compile(data.toLowerCase().split('\n')));
});
