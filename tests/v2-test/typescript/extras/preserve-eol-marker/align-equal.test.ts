import { Fixture, runTest } from '../../../extras-run-test';
import { parser } from '../parser';

const desc = '--preserve-eol-marker';
const name = 'align assignment';

const fixtures: Fixture[] = [
    {
        name: `${name} (1) basic`,
        input: `\
//---------------------------------------- (1)
    const a = true; //=
    foo = "bar";
    c = [
        d = 0,
        // multi-line
        1,
    ];
`,
        output: `\
//---------------------------------------- (1)
const a = true; //=
foo     = "bar";
c       = [
    (d = 0),
    // multi-line
    1,
];
`
    },
    {
        name: `${name} (2) grouping`,
        input: `\
//---------------------------------------- (2)
if (cond1) {
    a = true;
    foo = "bar";

    b = false;   //=
    bar = "abc";
    c = [
        d = 0,
        // multi-line
        1,
    ];
    defg = true;
    h = 4; //=
    ii = 5;
    jjj = 6; // start another group //=
    kk = 7;
}
`,
        output: `\
//---------------------------------------- (2)
if (cond1) {
    a = true;
    foo = "bar";

    b   = false;   //=
    bar = "abc";
    c   = [
        (d = 0),
        // multi-line
        1,
    ];
    defg = true;
    h  = 4; //=
    ii = 5;
    jjj = 6; // start another group //=
    kk  = 7;
}
`
    },
    {
        name: `${name} (3) arrow function`,
        input: `\
//---------------------------------------- (3)
if (cond1) {
    a = true;  //=
    foo = bar((i) => i + 1);
}
`,
        output: `\
//---------------------------------------- (3)
if (cond1) {
    a   = true;  //=
    foo = bar((i) => i + 1);
}
`
    },
    {
        name: `${name} (4) "if" corner case`,
        input: `\
//---------------------------------------- (4)
if (typeof x != "undefined") {
    const aaa = 1; //=
    const b = 2;
}
`,
        output: `\
//---------------------------------------- (4)
if (typeof x != "undefined") {
    const aaa = 1; //=
    const b   = 2;
}
`
    },
];

runTest({ desc, parser, fixtures });
