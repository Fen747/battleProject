tryReach = function ( obj ) {
  let i = 0,
      tmp = null;

  if (!obj)
    return { value: undefined, maxReached: obj };

  while (arguments[++i])
  {
    if (obj[arguments[i]] !== undefined)
      obj = obj[arguments[i]];
    else
    {
      obj = null
      return { value: undefined, maxReached: arguments[(i - 1)] };
    }
  }
  let res = { value: obj, maxReached: arguments[(i - 1)] };
  obj = null;
  return res;
};
