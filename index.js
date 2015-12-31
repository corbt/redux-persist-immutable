var transit = require('transit-immutable-js')

/* Generates a redux-persist compatible transformer 
 * based on the transit instance passed */
function createTransformer(transitInstance) {
  return {
    in: function(state){
      if(state && typeof state === 'object'){
        return transitInstance.toJSON(state)
      }
      return state
    },
    out: function(raw){
      if(typeof raw === 'string'){
        return transitInstance.fromJSON(raw)
      }
      return raw
    }
  }
}

var basicTransformer = createTransformer(transit);

module.exports = {
  in: basicTransformer.in,
  out: basicTransformer.out,

  withRecords: function(recordsArray) {
    return createTransformer(transit.withRecords(recordsArray))
  }
}
