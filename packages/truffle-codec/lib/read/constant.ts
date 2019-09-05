import debugModule from "debug";
const debug = debugModule("codec:read:constant");

import * as CodecUtils from "truffle-codec-utils";
import BN from "bn.js";
import { Errors } from "truffle-codec-utils";

export function readDefinition(definition: CodecUtils.AstDefinition): Uint8Array {

  debug("definition %o", definition);

  switch(CodecUtils.Definition.typeClass(definition))
  {
    case "rational":
      let numericalValue: BN = CodecUtils.Definition.rationalValue(definition);
      return CodecUtils.Conversion.toBytes(numericalValue, CodecUtils.EVM.WORD_SIZE);
      //you may be wondering, why do we not just use definition.value here,
      //like we do below? answer: because if this isn't a literal, that may not
      //exist
    case "stringliteral":
      return CodecUtils.Conversion.toBytes(definition.hexValue);
    default:
      //unfortunately, other types of constants are just too complicated to
      //handle right now.  sorry.
      debug("unsupported constant definition type");
      throw new Errors.DecodingError(
        {
          kind: "UnsupportedConstantError",
          definition
        }
      );
  }
}