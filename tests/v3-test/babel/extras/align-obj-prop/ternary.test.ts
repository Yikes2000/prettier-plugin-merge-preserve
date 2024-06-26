import { Fixture, runTestAlign } from '../../../extras-run-test';
import { parser } from '../parser';

const desc = '--align-object-properties';
const name = 'ternary';

const fixtures: Fixture[] = [
    {
        name: `${name} (1) new style`,
        input: `\
//---------------------------------------- (1)
    if (success) {
        isObject(count)
            ? resolve({
                  success: true,
                  response: \`Successfully...\`
              })
            : resolve({
                  success: false,
                  response: \`You do not...\`
              });
    }
`,
        output: `\
//---------------------------------------- (1)
if (success) {
    isObject(count)
        ? resolve({
              success  : true,
              response : \`Successfully...\`,
          })
        : resolve({
              success  : false,
              response : \`You do not...\`,
          });
}
`,
    },
    {
        name: `${name} (2) causes abnormal indent`,
        input: `\
//---------------------------------------- (2)
const a =
    ( cond1 || cond2 )
        ? {
              expression: "abc", // force multi-line
              id: 1,
          }
        : {
              // force multi-line
              id: 2,
          };

foo(true, {
    ...something, // force multi-line
    temporary: true,
    refresh: true
});
`,
        output: `\
//---------------------------------------- (2)
const a =
    cond1 || cond2
        ? {
              expression : "abc", // force multi-line
              id         : 1,
          }
        : {
              // force multi-line
              id : 2,
          };

foo(true, {
    ...something, // force multi-line
    temporary : true,
    refresh   : true,
});
`,
    },
];

runTestAlign({ desc, parser, fixtures });
