export function escapeParam(param) {
  	param = param.replace(';', '');
    param = param.replace('&', '');
    param = param.replace('|', '');
    param = param.replace('<', '');
    param = param.replace('>', '');
    param = param.replace("'", '');
    param = param.replace('#', '');
    
    return param;
}