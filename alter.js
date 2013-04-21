// simple-is.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013 Olov Lassus <olov.lassus@gmail.com>

var assert = require("assert");

// fragments is a list of {start: index, end: index, str: string to replace with}
function alter(str, fragments) {
    "use strict";

    var isArray = Array.isArray || function(v) {
        return Object.prototype.toString.call(v) === "[object Array]";
    };;

    assert(typeof str === "string");
    assert(isArray(fragments));

    fragments = fragments.map(function(v) {
        return v;
    }); // copy before destructive sort

    fragments.sort(function(a, b) {
        return a.start - b.start;
    });

    var outs = [];

    var pos = 0;
    for (var i = 0; i < fragments.length; i++) {
        var frag = fragments[i];

        assert(pos <= frag.start);
        assert(frag.start <= frag.end);
        outs.push(str.slice(pos, frag.start));
        outs.push(frag.str);
        pos = frag.end;
    }
    if (pos < str.length) {
        outs.push(str.slice(pos));
    }

    return outs.join("");
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = alter;
}
