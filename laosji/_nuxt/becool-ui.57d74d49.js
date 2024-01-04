import {r as Se, l as ae, o as Ee, c as Ze, p as qe, a as Tr, h as ut, S as $e, G as ur, Y as Cr, n as Zs, q as Uc, Z as Sb, b as Ct, $ as Nn, a0 as qc, u as Ge, a1 as Lr, I as Ob, g as zn, a2 as $b, y as Bn, m as jr, t as Pr, a3 as Tb, F as Ti, f as jb, w as fn, d as Ta, a4 as Hc, V as Kc, z as Fn, a5 as Eb, a6 as Ab, N as Cb, a7 as Pb, a8 as Or, k as ji, a9 as Xt, aa as Mb} from "./entry.8d2c1b27.js";
var Ec = n=>typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n
  , st = n=>!n || typeof n != "object" || Object.keys(n).length === 0
  , Nb = (n,i)=>JSON.stringify(n) === JSON.stringify(i);
function Yc(n, i) {
    n.forEach(function(r) {
        Array.isArray(r) ? Yc(r, i) : i.push(r)
    })
}
function Xc(n) {
    let i = [];
    return Yc(n, i),
    i
}
var Jc = (...n)=>Xc(n).filter(Boolean)
  , Rs = (n,i)=>{
    let r = {}
      , o = Object.keys(n)
      , s = Object.keys(i);
    for (let l of o)
        if (s.includes(l)) {
            let c = n[l]
              , f = i[l];
            typeof c == "object" && typeof f == "object" ? r[l] = Rs(c, f) : Array.isArray(c) || Array.isArray(f) ? r[l] = Jc(f, c) : r[l] = f + " " + c
        } else
            r[l] = n[l];
    for (let l of s)
        o.includes(l) || (r[l] = i[l]);
    return r
}
  , Ac = n=>!n || typeof n != "string" ? n : n.replace(/\s+/g, " ").trim();
function zb() {
    for (var n = 0, i, r, o = ""; n < arguments.length; )
        (i = arguments[n++]) && (r = Qc(i)) && (o && (o += " "),
        o += r);
    return o
}
function Qc(n) {
    if (typeof n == "string")
        return n;
    for (var i, r = "", o = 0; o < n.length; o++)
        n[o] && (i = Qc(n[o])) && (r && (r += " "),
        r += i);
    return r
}
var Fs = "-";
function Bb(n) {
    var i = Ib(n)
      , r = n.conflictingClassGroups
      , o = n.conflictingClassGroupModifiers
      , s = o === void 0 ? {} : o;
    function l(f) {
        var v = f.split(Fs);
        return v[0] === "" && v.length !== 1 && v.shift(),
        Gc(v, i) || Lb(f)
    }
    function c(f, v) {
        var g = r[f] || [];
        return v && s[f] ? [].concat(g, s[f]) : g
    }
    return {
        getClassGroupId: l,
        getConflictingClassGroupIds: c
    }
}
function Gc(n, i) {
    var r;
    if (n.length === 0)
        return i.classGroupId;
    var o = n[0]
      , s = i.nextPart.get(o)
      , l = s ? Gc(n.slice(1), s) : void 0;
    if (l)
        return l;
    if (i.validators.length !== 0) {
        var c = n.join(Fs);
        return (r = i.validators.find(function(f) {
            var v = f.validator;
            return v(c)
        })) == null ? void 0 : r.classGroupId
    }
}
var Cc = /^\[(.+)\]$/;
function Lb(n) {
    if (Cc.test(n)) {
        var i = Cc.exec(n)[1]
          , r = i == null ? void 0 : i.substring(0, i.indexOf(":"));
        if (r)
            return "arbitrary.." + r
    }
}
function Ib(n) {
    var i = n.theme
      , r = n.prefix
      , o = {
        nextPart: new Map,
        validators: []
    }
      , s = Zb(Object.entries(n.classGroups), r);
    return s.forEach(function(l) {
        var c = l[0]
          , f = l[1];
        Ss(f, o, c, i)
    }),
    o
}
function Ss(n, i, r, o) {
    n.forEach(function(s) {
        if (typeof s == "string") {
            var l = s === "" ? i : Pc(i, s);
            l.classGroupId = r;
            return
        }
        if (typeof s == "function") {
            if (Db(s)) {
                Ss(s(o), i, r, o);
                return
            }
            i.validators.push({
                validator: s,
                classGroupId: r
            });
            return
        }
        Object.entries(s).forEach(function(c) {
            var f = c[0]
              , v = c[1];
            Ss(v, Pc(i, f), r, o)
        })
    })
}
function Pc(n, i) {
    var r = n;
    return i.split(Fs).forEach(function(o) {
        r.nextPart.has(o) || r.nextPart.set(o, {
            nextPart: new Map,
            validators: []
        }),
        r = r.nextPart.get(o)
    }),
    r
}
function Db(n) {
    return n.isThemeGetter
}
function Zb(n, i) {
    return i ? n.map(function(r) {
        var o = r[0]
          , s = r[1]
          , l = s.map(function(c) {
            return typeof c == "string" ? i + c : typeof c == "object" ? Object.fromEntries(Object.entries(c).map(function(f) {
                var v = f[0]
                  , g = f[1];
                return [i + v, g]
            })) : c
        });
        return [o, l]
    }) : n
}
function Rb(n) {
    if (n < 1)
        return {
            get: function() {},
            set: function() {}
        };
    var i = 0
      , r = new Map
      , o = new Map;
    function s(l, c) {
        r.set(l, c),
        i++,
        i > n && (i = 0,
        o = r,
        r = new Map)
    }
    return {
        get: function(l) {
            var c = r.get(l);
            if (c !== void 0)
                return c;
            if ((c = o.get(l)) !== void 0)
                return s(l, c),
                c
        },
        set: function(l, c) {
            r.has(l) ? r.set(l, c) : s(l, c)
        }
    }
}
var ed = "!";
function Fb(n) {
    var i = n.separator || ":"
      , r = i.length === 1
      , o = i[0]
      , s = i.length;
    return function(l) {
        for (var c = [], f = 0, v = 0, g, y = 0; y < l.length; y++) {
            var O = l[y];
            if (f === 0) {
                if (O === o && (r || l.slice(y, y + s) === i)) {
                    c.push(l.slice(v, y)),
                    v = y + s;
                    continue
                }
                if (O === "/") {
                    g = y;
                    continue
                }
            }
            O === "[" ? f++ : O === "]" && f--
        }
        var N = c.length === 0 ? l : l.substring(v)
          , k = N.startsWith(ed)
          , w = k ? N.substring(1) : N
          , P = g && g > v ? g - v : void 0;
        return {
            modifiers: c,
            hasImportantModifier: k,
            baseClassName: w,
            maybePostfixModifierPosition: P
        }
    }
}
function Wb(n) {
    if (n.length <= 1)
        return n;
    var i = []
      , r = [];
    return n.forEach(function(o) {
        var s = o[0] === "[";
        s ? (i.push.apply(i, r.sort().concat([o])),
        r = []) : r.push(o)
    }),
    i.push.apply(i, r.sort()),
    i
}
function Vb(n) {
    return {
        cache: Rb(n.cacheSize),
        splitModifiers: Fb(n),
        ...Bb(n)
    }
}
var Ub = /\s+/;
function qb(n, i) {
    var r = i.splitModifiers
      , o = i.getClassGroupId
      , s = i.getConflictingClassGroupIds
      , l = new Set;
    return n.trim().split(Ub).map(function(c) {
        var f = r(c)
          , v = f.modifiers
          , g = f.hasImportantModifier
          , y = f.baseClassName
          , O = f.maybePostfixModifierPosition
          , N = o(O ? y.substring(0, O) : y)
          , k = !!O;
        if (!N) {
            if (!O)
                return {
                    isTailwindClass: !1,
                    originalClassName: c
                };
            if (N = o(y),
            !N)
                return {
                    isTailwindClass: !1,
                    originalClassName: c
                };
            k = !1
        }
        var w = Wb(v).join(":")
          , P = g ? w + ed : w;
        return {
            isTailwindClass: !0,
            modifierId: P,
            classGroupId: N,
            originalClassName: c,
            hasPostfixModifier: k
        }
    }).reverse().filter(function(c) {
        if (!c.isTailwindClass)
            return !0;
        var f = c.modifierId
          , v = c.classGroupId
          , g = c.hasPostfixModifier
          , y = f + v;
        return l.has(y) ? !1 : (l.add(y),
        s(v, g).forEach(function(O) {
            return l.add(f + O)
        }),
        !0)
    }).reverse().map(function(c) {
        return c.originalClassName
    }).join(" ")
}
function Os() {
    for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++)
        i[r] = arguments[r];
    var o, s, l, c = f;
    function f(g) {
        var y = i[0]
          , O = i.slice(1)
          , N = O.reduce(function(k, w) {
            return w(k)
        }, y());
        return o = Vb(N),
        s = o.cache.get,
        l = o.cache.set,
        c = v,
        v(g)
    }
    function v(g) {
        var y = s(g);
        if (y)
            return y;
        var O = qb(g, o);
        return l(g, O),
        O
    }
    return function() {
        return c(zb.apply(null, arguments))
    }
}
function Be(n) {
    var i = function(r) {
        return r[n] || []
    };
    return i.isThemeGetter = !0,
    i
}
var td = /^\[(?:([a-z-]+):)?(.+)\]$/i
  , Hb = /^\d+\/\d+$/
  , Kb = new Set(["px", "full", "screen"])
  , Yb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/
  , Xb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/
  , Jb = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function Zt(n) {
    return Gn(n) || Kb.has(n) || Hb.test(n) || $s(n)
}
function $s(n) {
    return lr(n, "length", r_)
}
function Qb(n) {
    return lr(n, "size", nd)
}
function Gb(n) {
    return lr(n, "position", nd)
}
function e_(n) {
    return lr(n, "url", i_)
}
function ka(n) {
    return lr(n, "number", Gn)
}
function Gn(n) {
    return !Number.isNaN(Number(n))
}
function t_(n) {
    return n.endsWith("%") && Gn(n.slice(0, -1))
}
function ii(n) {
    return Mc(n) || lr(n, "number", Mc)
}
function ke(n) {
    return td.test(n)
}
function ai() {
    return !0
}
function An(n) {
    return Yb.test(n)
}
function n_(n) {
    return lr(n, "", a_)
}
function lr(n, i, r) {
    var o = td.exec(n);
    return o ? o[1] ? o[1] === i : r(o[2]) : !1
}
function r_(n) {
    return Xb.test(n)
}
function nd() {
    return !1
}
function i_(n) {
    return n.startsWith("url(")
}
function Mc(n) {
    return Number.isInteger(Number(n))
}
function a_(n) {
    return Jb.test(n)
}
function Ts() {
    var n = Be("colors")
      , i = Be("spacing")
      , r = Be("blur")
      , o = Be("brightness")
      , s = Be("borderColor")
      , l = Be("borderRadius")
      , c = Be("borderSpacing")
      , f = Be("borderWidth")
      , v = Be("contrast")
      , g = Be("grayscale")
      , y = Be("hueRotate")
      , O = Be("invert")
      , N = Be("gap")
      , k = Be("gradientColorStops")
      , w = Be("gradientColorStopPositions")
      , P = Be("inset")
      , S = Be("margin")
      , Z = Be("opacity")
      , I = Be("padding")
      , j = Be("saturate")
      , H = Be("scale")
      , W = Be("sepia")
      , V = Be("skew")
      , T = Be("space")
      , L = Be("translate")
      , Q = function() {
        return ["auto", "contain", "none"]
    }
      , ne = function() {
        return ["auto", "hidden", "clip", "visible", "scroll"]
    }
      , Y = function() {
        return ["auto", ke, i]
    }
      , U = function() {
        return [ke, i]
    }
      , D = function() {
        return ["", Zt]
    }
      , E = function() {
        return ["auto", Gn, ke]
    }
      , C = function() {
        return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"]
    }
      , F = function() {
        return ["solid", "dashed", "dotted", "double", "none"]
    }
      , B = function() {
        return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"]
    }
      , K = function() {
        return ["start", "end", "center", "between", "around", "evenly", "stretch"]
    }
      , te = function() {
        return ["", "0", ke]
    }
      , me = function() {
        return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]
    }
      , ce = function() {
        return [Gn, ka]
    }
      , Ce = function() {
        return [Gn, ke]
    };
    return {
        cacheSize: 500,
        theme: {
            colors: [ai],
            spacing: [Zt],
            blur: ["none", "", An, ke],
            brightness: ce(),
            borderColor: [n],
            borderRadius: ["none", "", "full", An, ke],
            borderSpacing: U(),
            borderWidth: D(),
            contrast: ce(),
            grayscale: te(),
            hueRotate: Ce(),
            invert: te(),
            gap: U(),
            gradientColorStops: [n],
            gradientColorStopPositions: [t_, $s],
            inset: Y(),
            margin: Y(),
            opacity: ce(),
            padding: U(),
            saturate: ce(),
            scale: ce(),
            sepia: te(),
            skew: Ce(),
            space: U(),
            translate: U()
        },
        classGroups: {
            aspect: [{
                aspect: ["auto", "square", "video", ke]
            }],
            container: ["container"],
            columns: [{
                columns: [An]
            }],
            "break-after": [{
                "break-after": me()
            }],
            "break-before": [{
                "break-before": me()
            }],
            "break-inside": [{
                "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
            }],
            "box-decoration": [{
                "box-decoration": ["slice", "clone"]
            }],
            box: [{
                box: ["border", "content"]
            }],
            display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
            float: [{
                float: ["right", "left", "none"]
            }],
            clear: [{
                clear: ["left", "right", "both", "none"]
            }],
            isolation: ["isolate", "isolation-auto"],
            "object-fit": [{
                object: ["contain", "cover", "fill", "none", "scale-down"]
            }],
            "object-position": [{
                object: [].concat(C(), [ke])
            }],
            overflow: [{
                overflow: ne()
            }],
            "overflow-x": [{
                "overflow-x": ne()
            }],
            "overflow-y": [{
                "overflow-y": ne()
            }],
            overscroll: [{
                overscroll: Q()
            }],
            "overscroll-x": [{
                "overscroll-x": Q()
            }],
            "overscroll-y": [{
                "overscroll-y": Q()
            }],
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            inset: [{
                inset: [P]
            }],
            "inset-x": [{
                "inset-x": [P]
            }],
            "inset-y": [{
                "inset-y": [P]
            }],
            start: [{
                start: [P]
            }],
            end: [{
                end: [P]
            }],
            top: [{
                top: [P]
            }],
            right: [{
                right: [P]
            }],
            bottom: [{
                bottom: [P]
            }],
            left: [{
                left: [P]
            }],
            visibility: ["visible", "invisible", "collapse"],
            z: [{
                z: ["auto", ii]
            }],
            basis: [{
                basis: Y()
            }],
            "flex-direction": [{
                flex: ["row", "row-reverse", "col", "col-reverse"]
            }],
            "flex-wrap": [{
                flex: ["wrap", "wrap-reverse", "nowrap"]
            }],
            flex: [{
                flex: ["1", "auto", "initial", "none", ke]
            }],
            grow: [{
                grow: te()
            }],
            shrink: [{
                shrink: te()
            }],
            order: [{
                order: ["first", "last", "none", ii]
            }],
            "grid-cols": [{
                "grid-cols": [ai]
            }],
            "col-start-end": [{
                col: ["auto", {
                    span: ["full", ii]
                }, ke]
            }],
            "col-start": [{
                "col-start": E()
            }],
            "col-end": [{
                "col-end": E()
            }],
            "grid-rows": [{
                "grid-rows": [ai]
            }],
            "row-start-end": [{
                row: ["auto", {
                    span: [ii]
                }, ke]
            }],
            "row-start": [{
                "row-start": E()
            }],
            "row-end": [{
                "row-end": E()
            }],
            "grid-flow": [{
                "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
            }],
            "auto-cols": [{
                "auto-cols": ["auto", "min", "max", "fr", ke]
            }],
            "auto-rows": [{
                "auto-rows": ["auto", "min", "max", "fr", ke]
            }],
            gap: [{
                gap: [N]
            }],
            "gap-x": [{
                "gap-x": [N]
            }],
            "gap-y": [{
                "gap-y": [N]
            }],
            "justify-content": [{
                justify: ["normal"].concat(K())
            }],
            "justify-items": [{
                "justify-items": ["start", "end", "center", "stretch"]
            }],
            "justify-self": [{
                "justify-self": ["auto", "start", "end", "center", "stretch"]
            }],
            "align-content": [{
                content: ["normal"].concat(K(), ["baseline"])
            }],
            "align-items": [{
                items: ["start", "end", "center", "baseline", "stretch"]
            }],
            "align-self": [{
                self: ["auto", "start", "end", "center", "stretch", "baseline"]
            }],
            "place-content": [{
                "place-content": [].concat(K(), ["baseline"])
            }],
            "place-items": [{
                "place-items": ["start", "end", "center", "baseline", "stretch"]
            }],
            "place-self": [{
                "place-self": ["auto", "start", "end", "center", "stretch"]
            }],
            p: [{
                p: [I]
            }],
            px: [{
                px: [I]
            }],
            py: [{
                py: [I]
            }],
            ps: [{
                ps: [I]
            }],
            pe: [{
                pe: [I]
            }],
            pt: [{
                pt: [I]
            }],
            pr: [{
                pr: [I]
            }],
            pb: [{
                pb: [I]
            }],
            pl: [{
                pl: [I]
            }],
            m: [{
                m: [S]
            }],
            mx: [{
                mx: [S]
            }],
            my: [{
                my: [S]
            }],
            ms: [{
                ms: [S]
            }],
            me: [{
                me: [S]
            }],
            mt: [{
                mt: [S]
            }],
            mr: [{
                mr: [S]
            }],
            mb: [{
                mb: [S]
            }],
            ml: [{
                ml: [S]
            }],
            "space-x": [{
                "space-x": [T]
            }],
            "space-x-reverse": ["space-x-reverse"],
            "space-y": [{
                "space-y": [T]
            }],
            "space-y-reverse": ["space-y-reverse"],
            w: [{
                w: ["auto", "min", "max", "fit", ke, i]
            }],
            "min-w": [{
                "min-w": ["min", "max", "fit", ke, Zt]
            }],
            "max-w": [{
                "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
                    screen: [An]
                }, An, ke]
            }],
            h: [{
                h: [ke, i, "auto", "min", "max", "fit"]
            }],
            "min-h": [{
                "min-h": ["min", "max", "fit", ke, Zt]
            }],
            "max-h": [{
                "max-h": [ke, i, "min", "max", "fit"]
            }],
            "font-size": [{
                text: ["base", An, $s]
            }],
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            "font-style": ["italic", "not-italic"],
            "font-weight": [{
                font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ka]
            }],
            "font-family": [{
                font: [ai]
            }],
            "fvn-normal": ["normal-nums"],
            "fvn-ordinal": ["ordinal"],
            "fvn-slashed-zero": ["slashed-zero"],
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
            tracking: [{
                tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ke]
            }],
            "line-clamp": [{
                "line-clamp": ["none", Gn, ka]
            }],
            leading: [{
                leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ke, Zt]
            }],
            "list-image": [{
                "list-image": ["none", ke]
            }],
            "list-style-type": [{
                list: ["none", "disc", "decimal", ke]
            }],
            "list-style-position": [{
                list: ["inside", "outside"]
            }],
            "placeholder-color": [{
                placeholder: [n]
            }],
            "placeholder-opacity": [{
                "placeholder-opacity": [Z]
            }],
            "text-alignment": [{
                text: ["left", "center", "right", "justify", "start", "end"]
            }],
            "text-color": [{
                text: [n]
            }],
            "text-opacity": [{
                "text-opacity": [Z]
            }],
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            "text-decoration-style": [{
                decoration: [].concat(F(), ["wavy"])
            }],
            "text-decoration-thickness": [{
                decoration: ["auto", "from-font", Zt]
            }],
            "underline-offset": [{
                "underline-offset": ["auto", ke, Zt]
            }],
            "text-decoration-color": [{
                decoration: [n]
            }],
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            indent: [{
                indent: U()
            }],
            "vertical-align": [{
                align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ke]
            }],
            whitespace: [{
                whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
            }],
            break: [{
                break: ["normal", "words", "all", "keep"]
            }],
            hyphens: [{
                hyphens: ["none", "manual", "auto"]
            }],
            content: [{
                content: ["none", ke]
            }],
            "bg-attachment": [{
                bg: ["fixed", "local", "scroll"]
            }],
            "bg-clip": [{
                "bg-clip": ["border", "padding", "content", "text"]
            }],
            "bg-opacity": [{
                "bg-opacity": [Z]
            }],
            "bg-origin": [{
                "bg-origin": ["border", "padding", "content"]
            }],
            "bg-position": [{
                bg: [].concat(C(), [Gb])
            }],
            "bg-repeat": [{
                bg: ["no-repeat", {
                    repeat: ["", "x", "y", "round", "space"]
                }]
            }],
            "bg-size": [{
                bg: ["auto", "cover", "contain", Qb]
            }],
            "bg-image": [{
                bg: ["none", {
                    "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                }, e_]
            }],
            "bg-color": [{
                bg: [n]
            }],
            "gradient-from-pos": [{
                from: [w]
            }],
            "gradient-via-pos": [{
                via: [w]
            }],
            "gradient-to-pos": [{
                to: [w]
            }],
            "gradient-from": [{
                from: [k]
            }],
            "gradient-via": [{
                via: [k]
            }],
            "gradient-to": [{
                to: [k]
            }],
            rounded: [{
                rounded: [l]
            }],
            "rounded-s": [{
                "rounded-s": [l]
            }],
            "rounded-e": [{
                "rounded-e": [l]
            }],
            "rounded-t": [{
                "rounded-t": [l]
            }],
            "rounded-r": [{
                "rounded-r": [l]
            }],
            "rounded-b": [{
                "rounded-b": [l]
            }],
            "rounded-l": [{
                "rounded-l": [l]
            }],
            "rounded-ss": [{
                "rounded-ss": [l]
            }],
            "rounded-se": [{
                "rounded-se": [l]
            }],
            "rounded-ee": [{
                "rounded-ee": [l]
            }],
            "rounded-es": [{
                "rounded-es": [l]
            }],
            "rounded-tl": [{
                "rounded-tl": [l]
            }],
            "rounded-tr": [{
                "rounded-tr": [l]
            }],
            "rounded-br": [{
                "rounded-br": [l]
            }],
            "rounded-bl": [{
                "rounded-bl": [l]
            }],
            "border-w": [{
                border: [f]
            }],
            "border-w-x": [{
                "border-x": [f]
            }],
            "border-w-y": [{
                "border-y": [f]
            }],
            "border-w-s": [{
                "border-s": [f]
            }],
            "border-w-e": [{
                "border-e": [f]
            }],
            "border-w-t": [{
                "border-t": [f]
            }],
            "border-w-r": [{
                "border-r": [f]
            }],
            "border-w-b": [{
                "border-b": [f]
            }],
            "border-w-l": [{
                "border-l": [f]
            }],
            "border-opacity": [{
                "border-opacity": [Z]
            }],
            "border-style": [{
                border: [].concat(F(), ["hidden"])
            }],
            "divide-x": [{
                "divide-x": [f]
            }],
            "divide-x-reverse": ["divide-x-reverse"],
            "divide-y": [{
                "divide-y": [f]
            }],
            "divide-y-reverse": ["divide-y-reverse"],
            "divide-opacity": [{
                "divide-opacity": [Z]
            }],
            "divide-style": [{
                divide: F()
            }],
            "border-color": [{
                border: [s]
            }],
            "border-color-x": [{
                "border-x": [s]
            }],
            "border-color-y": [{
                "border-y": [s]
            }],
            "border-color-t": [{
                "border-t": [s]
            }],
            "border-color-r": [{
                "border-r": [s]
            }],
            "border-color-b": [{
                "border-b": [s]
            }],
            "border-color-l": [{
                "border-l": [s]
            }],
            "divide-color": [{
                divide: [s]
            }],
            "outline-style": [{
                outline: [""].concat(F())
            }],
            "outline-offset": [{
                "outline-offset": [ke, Zt]
            }],
            "outline-w": [{
                outline: [Zt]
            }],
            "outline-color": [{
                outline: [n]
            }],
            "ring-w": [{
                ring: D()
            }],
            "ring-w-inset": ["ring-inset"],
            "ring-color": [{
                ring: [n]
            }],
            "ring-opacity": [{
                "ring-opacity": [Z]
            }],
            "ring-offset-w": [{
                "ring-offset": [Zt]
            }],
            "ring-offset-color": [{
                "ring-offset": [n]
            }],
            shadow: [{
                shadow: ["", "inner", "none", An, n_]
            }],
            "shadow-color": [{
                shadow: [ai]
            }],
            opacity: [{
                opacity: [Z]
            }],
            "mix-blend": [{
                "mix-blend": B()
            }],
            "bg-blend": [{
                "bg-blend": B()
            }],
            filter: [{
                filter: ["", "none"]
            }],
            blur: [{
                blur: [r]
            }],
            brightness: [{
                brightness: [o]
            }],
            contrast: [{
                contrast: [v]
            }],
            "drop-shadow": [{
                "drop-shadow": ["", "none", An, ke]
            }],
            grayscale: [{
                grayscale: [g]
            }],
            "hue-rotate": [{
                "hue-rotate": [y]
            }],
            invert: [{
                invert: [O]
            }],
            saturate: [{
                saturate: [j]
            }],
            sepia: [{
                sepia: [W]
            }],
            "backdrop-filter": [{
                "backdrop-filter": ["", "none"]
            }],
            "backdrop-blur": [{
                "backdrop-blur": [r]
            }],
            "backdrop-brightness": [{
                "backdrop-brightness": [o]
            }],
            "backdrop-contrast": [{
                "backdrop-contrast": [v]
            }],
            "backdrop-grayscale": [{
                "backdrop-grayscale": [g]
            }],
            "backdrop-hue-rotate": [{
                "backdrop-hue-rotate": [y]
            }],
            "backdrop-invert": [{
                "backdrop-invert": [O]
            }],
            "backdrop-opacity": [{
                "backdrop-opacity": [Z]
            }],
            "backdrop-saturate": [{
                "backdrop-saturate": [j]
            }],
            "backdrop-sepia": [{
                "backdrop-sepia": [W]
            }],
            "border-collapse": [{
                border: ["collapse", "separate"]
            }],
            "border-spacing": [{
                "border-spacing": [c]
            }],
            "border-spacing-x": [{
                "border-spacing-x": [c]
            }],
            "border-spacing-y": [{
                "border-spacing-y": [c]
            }],
            "table-layout": [{
                table: ["auto", "fixed"]
            }],
            caption: [{
                caption: ["top", "bottom"]
            }],
            transition: [{
                transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ke]
            }],
            duration: [{
                duration: Ce()
            }],
            ease: [{
                ease: ["linear", "in", "out", "in-out", ke]
            }],
            delay: [{
                delay: Ce()
            }],
            animate: [{
                animate: ["none", "spin", "ping", "pulse", "bounce", ke]
            }],
            transform: [{
                transform: ["", "gpu", "none"]
            }],
            scale: [{
                scale: [H]
            }],
            "scale-x": [{
                "scale-x": [H]
            }],
            "scale-y": [{
                "scale-y": [H]
            }],
            rotate: [{
                rotate: [ii, ke]
            }],
            "translate-x": [{
                "translate-x": [L]
            }],
            "translate-y": [{
                "translate-y": [L]
            }],
            "skew-x": [{
                "skew-x": [V]
            }],
            "skew-y": [{
                "skew-y": [V]
            }],
            "transform-origin": [{
                origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", ke]
            }],
            accent: [{
                accent: ["auto", n]
            }],
            appearance: ["appearance-none"],
            cursor: [{
                cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ke]
            }],
            "caret-color": [{
                caret: [n]
            }],
            "pointer-events": [{
                "pointer-events": ["none", "auto"]
            }],
            resize: [{
                resize: ["none", "y", "x", ""]
            }],
            "scroll-behavior": [{
                scroll: ["auto", "smooth"]
            }],
            "scroll-m": [{
                "scroll-m": U()
            }],
            "scroll-mx": [{
                "scroll-mx": U()
            }],
            "scroll-my": [{
                "scroll-my": U()
            }],
            "scroll-ms": [{
                "scroll-ms": U()
            }],
            "scroll-me": [{
                "scroll-me": U()
            }],
            "scroll-mt": [{
                "scroll-mt": U()
            }],
            "scroll-mr": [{
                "scroll-mr": U()
            }],
            "scroll-mb": [{
                "scroll-mb": U()
            }],
            "scroll-ml": [{
                "scroll-ml": U()
            }],
            "scroll-p": [{
                "scroll-p": U()
            }],
            "scroll-px": [{
                "scroll-px": U()
            }],
            "scroll-py": [{
                "scroll-py": U()
            }],
            "scroll-ps": [{
                "scroll-ps": U()
            }],
            "scroll-pe": [{
                "scroll-pe": U()
            }],
            "scroll-pt": [{
                "scroll-pt": U()
            }],
            "scroll-pr": [{
                "scroll-pr": U()
            }],
            "scroll-pb": [{
                "scroll-pb": U()
            }],
            "scroll-pl": [{
                "scroll-pl": U()
            }],
            "snap-align": [{
                snap: ["start", "end", "center", "align-none"]
            }],
            "snap-stop": [{
                snap: ["normal", "always"]
            }],
            "snap-type": [{
                snap: ["none", "x", "y", "both"]
            }],
            "snap-strictness": [{
                snap: ["mandatory", "proximity"]
            }],
            touch: [{
                touch: ["auto", "none", "pinch-zoom", "manipulation", {
                    pan: ["x", "left", "right", "y", "up", "down"]
                }]
            }],
            select: [{
                select: ["none", "text", "all", "auto"]
            }],
            "will-change": [{
                "will-change": ["auto", "scroll", "contents", "transform", ke]
            }],
            fill: [{
                fill: [n, "none"]
            }],
            "stroke-w": [{
                stroke: [Zt, ka]
            }],
            stroke: [{
                stroke: [n, "none"]
            }],
            sr: ["sr-only", "not-sr-only"]
        },
        conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            "font-size": ["leading"],
            "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"]
        },
        conflictingClassGroupModifiers: {
            "font-size": ["leading"]
        }
    }
}
function o_(n, i) {
    for (var r in i)
        rd(n, r, i[r]);
    return n
}
var s_ = Object.prototype.hasOwnProperty
  , u_ = new Set(["string", "number", "boolean"]);
function rd(n, i, r) {
    if (!s_.call(n, i) || u_.has(typeof r) || r === null) {
        n[i] = r;
        return
    }
    if (Array.isArray(r) && Array.isArray(n[i])) {
        n[i] = n[i].concat(r);
        return
    }
    if (typeof r == "object" && typeof n[i] == "object") {
        if (n[i] === null) {
            n[i] = r;
            return
        }
        for (var o in r)
            rd(n[i], o, r[o])
    }
}
function l_(n) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
        r[o - 1] = arguments[o];
    return typeof n == "function" ? Os.apply(void 0, [Ts, n].concat(r)) : Os.apply(void 0, [function() {
        return o_(Ts(), n)
    }
    ].concat(r))
}
var c_ = Os(Ts)
  , d_ = {
    twMerge: !0,
    twMergeConfig: {},
    responsiveVariants: !1
}
  , id = n=>n || void 0
  , ja = (...n)=>id(Xc(n).filter(Boolean).join(" "))
  , xs = null
  , Ea = {}
  , js = !1
  , oi = (...n)=>i=>i.twMerge ? ((!xs || js) && (js = !1,
xs = st(Ea) ? c_ : l_(Ea)),
id(xs(ja(n)))) : ja(n)
  , Nc = (n,i)=>{
    for (let r in i)
        n.hasOwnProperty(r) ? n[r] = ja(n[r], i[r]) : n[r] = i[r];
    return n
}
  , Mt = (n,i)=>{
    let {extend: r=null, slots: o={}, variants: s={}, compoundVariants: l=[], compoundSlots: c=[], defaultVariants: f={}} = n
      , v = {
        ...d_,
        ...i
    }
      , g = r != null && r.base ? ja(r.base, n == null ? void 0 : n.base) : n == null ? void 0 : n.base
      , y = r != null && r.variants && !st(r.variants) ? Rs(s, r.variants) : s
      , O = r != null && r.defaultVariants && !st(r.defaultVariants) ? {
        ...r.defaultVariants,
        ...f
    } : f;
    !st(v.twMergeConfig) && !Nb(v.twMergeConfig, Ea) && (js = !0,
    Ea = v.twMergeConfig);
    let N = st(o) ? {} : {
        base: n == null ? void 0 : n.base,
        ...o
    }
      , k = st(r == null ? void 0 : r.slots) ? N : Nc({
        ...r == null ? void 0 : r.slots
    }, st(N) ? {
        base: n == null ? void 0 : n.base
    } : N)
      , w = S=>{
        if (st(y) && st(o) && st(r == null ? void 0 : r.slots))
            return oi(g, S == null ? void 0 : S.class, S == null ? void 0 : S.className)(v);
        if (l && !Array.isArray(l))
            throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof l}`);
        if (c && !Array.isArray(c))
            throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof c}`);
        let Z = (Y,U,D=[],E)=>{
            let C = D;
            if (typeof U == "string")
                C = C.concat(Ac(U).split(" ").map(F=>`${Y}:${F}`));
            else if (Array.isArray(U))
                C = C.concat(U.reduce((F,B)=>F.concat(`${Y}:${B}`), []));
            else if (typeof U == "object" && typeof E == "string") {
                for (let F in U)
                    if (U.hasOwnProperty(F) && F === E) {
                        let B = U[F];
                        if (B && typeof B == "string") {
                            let K = Ac(B);
                            C[E] ? C[E] = C[E].concat(K.split(" ").map(te=>`${Y}:${te}`)) : C[E] = K.split(" ").map(te=>`${Y}:${te}`)
                        } else
                            Array.isArray(B) && B.length > 0 && (C[E] = B.reduce((K,te)=>K.concat(`${Y}:${te}`), []))
                    }
            }
            return C
        }
          , I = (Y,U=y,D=null,E=null)=>{
            var C;
            let F = U[Y];
            if (!F || st(F))
                return null;
            let B = (C = E == null ? void 0 : E[Y]) != null ? C : S == null ? void 0 : S[Y];
            if (B === null)
                return null;
            let K = Ec(B)
              , te = Array.isArray(v.responsiveVariants) && v.responsiveVariants.length > 0 || v.responsiveVariants === !0
              , me = O == null ? void 0 : O[Y]
              , ce = [];
            if (typeof K == "object" && te)
                for (let[Re,Xe] of Object.entries(K)) {
                    let rt = F[Xe];
                    if (Re === "initial") {
                        me = Xe;
                        continue
                    }
                    Array.isArray(v.responsiveVariants) && !v.responsiveVariants.includes(Re) || (ce = Z(Re, rt, ce, D))
                }
            let Ce = F[K] || F[Ec(me)];
            return typeof ce == "object" && typeof D == "string" && ce[D] ? Nc(ce, Ce) : ce.length > 0 ? (ce.push(Ce),
            ce) : Ce
        }
          , j = ()=>y ? Object.keys(y).map(Y=>I(Y, y)) : null
          , H = (Y,U)=>{
            if (!y || typeof y != "object")
                return null;
            let D = new Array;
            for (let E in y) {
                let C = I(E, y, Y, U)
                  , F = Y === "base" && typeof C == "string" ? C : C && C[Y];
                F && (D[D.length] = F)
            }
            return D
        }
          , W = {};
        for (let Y in S)
            S[Y] !== void 0 && (W[Y] = S[Y]);
        let V = (Y,U)=>{
            var D;
            let E = typeof (S == null ? void 0 : S[Y]) == "object" ? {
                [Y]: (D = S[Y]) == null ? void 0 : D.initial
            } : {};
            return {
                ...O,
                ...W,
                ...E,
                ...U
            }
        }
          , T = (Y=[],U)=>{
            let D = [];
            for (let {class: E, className: C, ...F} of Y) {
                let B = !0;
                for (let[K,te] of Object.entries(F)) {
                    let me = V(K, U);
                    if (Array.isArray(te)) {
                        if (!te.includes(me[K])) {
                            B = !1;
                            break
                        }
                    } else if (me[K] !== te) {
                        B = !1;
                        break
                    }
                }
                B && (E && D.push(E),
                C && D.push(C))
            }
            return D
        }
          , L = Y=>{
            let U = T(l, Y)
              , D = T(r == null ? void 0 : r.compoundVariants, Y);
            return Jc(D, U)
        }
          , Q = Y=>{
            let U = L(Y);
            if (!Array.isArray(U))
                return U;
            let D = {};
            for (let E of U)
                if (typeof E == "string" && (D.base = oi(D.base, E)(v)),
                typeof E == "object")
                    for (let[C,F] of Object.entries(E))
                        D[C] = oi(D[C], F)(v);
            return D
        }
          , ne = Y=>{
            if (c.length < 1)
                return null;
            let U = {};
            for (let {slots: D=[], class: E, className: C, ...F} of c) {
                if (!st(F)) {
                    let B = !0;
                    for (let K of Object.keys(F)) {
                        let te = V(K, Y)[K];
                        if (te === void 0 || (Array.isArray(F[K]) ? !F[K].includes(te) : F[K] !== te)) {
                            B = !1;
                            break
                        }
                    }
                    if (!B)
                        continue
                }
                for (let B of D)
                    U[B] = U[B] || [],
                    U[B].push([E, C])
            }
            return U
        }
        ;
        if (!st(o) || !st(r == null ? void 0 : r.slots)) {
            let Y = {};
            if (typeof k == "object" && !st(k))
                for (let U of Object.keys(k))
                    Y[U] = D=>{
                        var E, C;
                        return oi(k[U], H(U, D), ((E = Q(D)) != null ? E : [])[U], ((C = ne(D)) != null ? C : [])[U], D == null ? void 0 : D.class, D == null ? void 0 : D.className)(v)
                    }
                    ;
            return Y
        }
        return oi(g, j(), L(), S == null ? void 0 : S.class, S == null ? void 0 : S.className)(v)
    }
      , P = ()=>{
        if (!(!y || typeof y != "object"))
            return Object.keys(y)
    }
    ;
    return w.variantKeys = P(),
    w.extend = r,
    w.base = g,
    w.slots = k,
    w.variants = y,
    w.defaultVariants = O,
    w.compoundSlots = c,
    w.compoundVariants = l,
    w
}
  , f_ = n=>(i,r)=>Mt(i, r ? Rs(n, r) : n)
  , Pn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ws(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n
}
var Aa = {
    exports: {}
};
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Aa.exports;
(function(n, i) {
    (function() {
        var r, o = "4.17.21", s = 200, l = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", c = "Expected a function", f = "Invalid `variable` option passed into `_.template`", v = "__lodash_hash_undefined__", g = 500, y = "__lodash_placeholder__", O = 1, N = 2, k = 4, w = 1, P = 2, S = 1, Z = 2, I = 4, j = 8, H = 16, W = 32, V = 64, T = 128, L = 256, Q = 512, ne = 30, Y = "...", U = 800, D = 16, E = 1, C = 2, F = 3, B = 1 / 0, K = 9007199254740991, te = 17976931348623157e292, me = 0 / 0, ce = 4294967295, Ce = ce - 1, Re = ce >>> 1, Xe = [["ary", T], ["bind", S], ["bindKey", Z], ["curry", j], ["curryRight", H], ["flip", Q], ["partial", W], ["partialRight", V], ["rearg", L]], rt = "[object Arguments]", wt = "[object Array]", Wn = "[object AsyncFunction]", ht = "[object Boolean]", Ue = "[object Date]", Ut = "[object DOMException]", qt = "[object Error]", en = "[object Function]", Qs = "[object GeneratorFunction]", Nt = "[object Map]", Ir = "[object Number]", Zd = "[object Null]", tn = "[object Object]", Gs = "[object Promise]", Rd = "[object Proxy]", Dr = "[object RegExp]", zt = "[object Set]", Zr = "[object String]", Ni = "[object Symbol]", Fd = "[object Undefined]", Rr = "[object WeakMap]", Wd = "[object WeakSet]", Fr = "[object ArrayBuffer]", cr = "[object DataView]", Ga = "[object Float32Array]", eo = "[object Float64Array]", to = "[object Int8Array]", no = "[object Int16Array]", ro = "[object Int32Array]", io = "[object Uint8Array]", ao = "[object Uint8ClampedArray]", oo = "[object Uint16Array]", so = "[object Uint32Array]", Vd = /\b__p \+= '';/g, Ud = /\b(__p \+=) '' \+/g, qd = /(__e\(.*?\)|\b__t\)) \+\n'';/g, eu = /&(?:amp|lt|gt|quot|#39);/g, tu = /[&<>"']/g, Hd = RegExp(eu.source), Kd = RegExp(tu.source), Yd = /<%-([\s\S]+?)%>/g, Xd = /<%([\s\S]+?)%>/g, nu = /<%=([\s\S]+?)%>/g, Jd = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Qd = /^\w*$/, Gd = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, uo = /[\\^$.*+?()[\]{}|]/g, ef = RegExp(uo.source), lo = /^\s+/, tf = /\s/, nf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, rf = /\{\n\/\* \[wrapped with (.+)\] \*/, af = /,? & /, of = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, sf = /[()=,{}\[\]\/\s]/, uf = /\\(\\)?/g, lf = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, ru = /\w*$/, cf = /^[-+]0x[0-9a-f]+$/i, df = /^0b[01]+$/i, ff = /^\[object .+?Constructor\]$/, pf = /^0o[0-7]+$/i, hf = /^(?:0|[1-9]\d*)$/, vf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, zi = /($^)/, gf = /['\n\r\u2028\u2029\\]/g, Bi = "\\ud800-\\udfff", mf = "\\u0300-\\u036f", yf = "\\ufe20-\\ufe2f", bf = "\\u20d0-\\u20ff", iu = mf + yf + bf, au = "\\u2700-\\u27bf", ou = "a-z\\xdf-\\xf6\\xf8-\\xff", _f = "\\xac\\xb1\\xd7\\xf7", xf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", wf = "\\u2000-\\u206f", kf = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", su = "A-Z\\xc0-\\xd6\\xd8-\\xde", uu = "\\ufe0e\\ufe0f", lu = _f + xf + wf + kf, co = "['’]", Sf = "[" + Bi + "]", cu = "[" + lu + "]", Li = "[" + iu + "]", du = "\\d+", Of = "[" + au + "]", fu = "[" + ou + "]", pu = "[^" + Bi + lu + du + au + ou + su + "]", fo = "\\ud83c[\\udffb-\\udfff]", $f = "(?:" + Li + "|" + fo + ")", hu = "[^" + Bi + "]", po = "(?:\\ud83c[\\udde6-\\uddff]){2}", ho = "[\\ud800-\\udbff][\\udc00-\\udfff]", dr = "[" + su + "]", vu = "\\u200d", gu = "(?:" + fu + "|" + pu + ")", Tf = "(?:" + dr + "|" + pu + ")", mu = "(?:" + co + "(?:d|ll|m|re|s|t|ve))?", yu = "(?:" + co + "(?:D|LL|M|RE|S|T|VE))?", bu = $f + "?", _u = "[" + uu + "]?", jf = "(?:" + vu + "(?:" + [hu, po, ho].join("|") + ")" + _u + bu + ")*", Ef = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Af = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", xu = _u + bu + jf, Cf = "(?:" + [Of, po, ho].join("|") + ")" + xu, Pf = "(?:" + [hu + Li + "?", Li, po, ho, Sf].join("|") + ")", Mf = RegExp(co, "g"), Nf = RegExp(Li, "g"), vo = RegExp(fo + "(?=" + fo + ")|" + Pf + xu, "g"), zf = RegExp([dr + "?" + fu + "+" + mu + "(?=" + [cu, dr, "$"].join("|") + ")", Tf + "+" + yu + "(?=" + [cu, dr + gu, "$"].join("|") + ")", dr + "?" + gu + "+" + mu, dr + "+" + yu, Af, Ef, du, Cf].join("|"), "g"), Bf = RegExp("[" + vu + Bi + iu + uu + "]"), Lf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, If = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Df = -1, ze = {};
        ze[Ga] = ze[eo] = ze[to] = ze[no] = ze[ro] = ze[io] = ze[ao] = ze[oo] = ze[so] = !0,
        ze[rt] = ze[wt] = ze[Fr] = ze[ht] = ze[cr] = ze[Ue] = ze[qt] = ze[en] = ze[Nt] = ze[Ir] = ze[tn] = ze[Dr] = ze[zt] = ze[Zr] = ze[Rr] = !1;
        var Ne = {};
        Ne[rt] = Ne[wt] = Ne[Fr] = Ne[cr] = Ne[ht] = Ne[Ue] = Ne[Ga] = Ne[eo] = Ne[to] = Ne[no] = Ne[ro] = Ne[Nt] = Ne[Ir] = Ne[tn] = Ne[Dr] = Ne[zt] = Ne[Zr] = Ne[Ni] = Ne[io] = Ne[ao] = Ne[oo] = Ne[so] = !0,
        Ne[qt] = Ne[en] = Ne[Rr] = !1;
        var Zf = {
            À: "A",
            Á: "A",
            Â: "A",
            Ã: "A",
            Ä: "A",
            Å: "A",
            à: "a",
            á: "a",
            â: "a",
            ã: "a",
            ä: "a",
            å: "a",
            Ç: "C",
            ç: "c",
            Ð: "D",
            ð: "d",
            È: "E",
            É: "E",
            Ê: "E",
            Ë: "E",
            è: "e",
            é: "e",
            ê: "e",
            ë: "e",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ï: "I",
            ì: "i",
            í: "i",
            î: "i",
            ï: "i",
            Ñ: "N",
            ñ: "n",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Õ: "O",
            Ö: "O",
            Ø: "O",
            ò: "o",
            ó: "o",
            ô: "o",
            õ: "o",
            ö: "o",
            ø: "o",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ü: "U",
            ù: "u",
            ú: "u",
            û: "u",
            ü: "u",
            Ý: "Y",
            ý: "y",
            ÿ: "y",
            Æ: "Ae",
            æ: "ae",
            Þ: "Th",
            þ: "th",
            ß: "ss",
            Ā: "A",
            Ă: "A",
            Ą: "A",
            ā: "a",
            ă: "a",
            ą: "a",
            Ć: "C",
            Ĉ: "C",
            Ċ: "C",
            Č: "C",
            ć: "c",
            ĉ: "c",
            ċ: "c",
            č: "c",
            Ď: "D",
            Đ: "D",
            ď: "d",
            đ: "d",
            Ē: "E",
            Ĕ: "E",
            Ė: "E",
            Ę: "E",
            Ě: "E",
            ē: "e",
            ĕ: "e",
            ė: "e",
            ę: "e",
            ě: "e",
            Ĝ: "G",
            Ğ: "G",
            Ġ: "G",
            Ģ: "G",
            ĝ: "g",
            ğ: "g",
            ġ: "g",
            ģ: "g",
            Ĥ: "H",
            Ħ: "H",
            ĥ: "h",
            ħ: "h",
            Ĩ: "I",
            Ī: "I",
            Ĭ: "I",
            Į: "I",
            İ: "I",
            ĩ: "i",
            ī: "i",
            ĭ: "i",
            į: "i",
            ı: "i",
            Ĵ: "J",
            ĵ: "j",
            Ķ: "K",
            ķ: "k",
            ĸ: "k",
            Ĺ: "L",
            Ļ: "L",
            Ľ: "L",
            Ŀ: "L",
            Ł: "L",
            ĺ: "l",
            ļ: "l",
            ľ: "l",
            ŀ: "l",
            ł: "l",
            Ń: "N",
            Ņ: "N",
            Ň: "N",
            Ŋ: "N",
            ń: "n",
            ņ: "n",
            ň: "n",
            ŋ: "n",
            Ō: "O",
            Ŏ: "O",
            Ő: "O",
            ō: "o",
            ŏ: "o",
            ő: "o",
            Ŕ: "R",
            Ŗ: "R",
            Ř: "R",
            ŕ: "r",
            ŗ: "r",
            ř: "r",
            Ś: "S",
            Ŝ: "S",
            Ş: "S",
            Š: "S",
            ś: "s",
            ŝ: "s",
            ş: "s",
            š: "s",
            Ţ: "T",
            Ť: "T",
            Ŧ: "T",
            ţ: "t",
            ť: "t",
            ŧ: "t",
            Ũ: "U",
            Ū: "U",
            Ŭ: "U",
            Ů: "U",
            Ű: "U",
            Ų: "U",
            ũ: "u",
            ū: "u",
            ŭ: "u",
            ů: "u",
            ű: "u",
            ų: "u",
            Ŵ: "W",
            ŵ: "w",
            Ŷ: "Y",
            ŷ: "y",
            Ÿ: "Y",
            Ź: "Z",
            Ż: "Z",
            Ž: "Z",
            ź: "z",
            ż: "z",
            ž: "z",
            Ĳ: "IJ",
            ĳ: "ij",
            Œ: "Oe",
            œ: "oe",
            ŉ: "'n",
            ſ: "s"
        }
          , Rf = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }
          , Ff = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&#39;": "'"
        }
          , Wf = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , Vf = parseFloat
          , Uf = parseInt
          , wu = typeof Pn == "object" && Pn && Pn.Object === Object && Pn
          , qf = typeof self == "object" && self && self.Object === Object && self
          , Je = wu || qf || Function("return this")()
          , go = i && !i.nodeType && i
          , Vn = go && !0 && n && !n.nodeType && n
          , ku = Vn && Vn.exports === go
          , mo = ku && wu.process
          , kt = function() {
            try {
                var _ = Vn && Vn.require && Vn.require("util").types;
                return _ || mo && mo.binding && mo.binding("util")
            } catch {}
        }()
          , Su = kt && kt.isArrayBuffer
          , Ou = kt && kt.isDate
          , $u = kt && kt.isMap
          , Tu = kt && kt.isRegExp
          , ju = kt && kt.isSet
          , Eu = kt && kt.isTypedArray;
        function vt(_, A, $) {
            switch ($.length) {
            case 0:
                return _.call(A);
            case 1:
                return _.call(A, $[0]);
            case 2:
                return _.call(A, $[0], $[1]);
            case 3:
                return _.call(A, $[0], $[1], $[2])
            }
            return _.apply(A, $)
        }
        function Hf(_, A, $, G) {
            for (var fe = -1, je = _ == null ? 0 : _.length; ++fe < je; ) {
                var He = _[fe];
                A(G, He, $(He), _)
            }
            return G
        }
        function St(_, A) {
            for (var $ = -1, G = _ == null ? 0 : _.length; ++$ < G && A(_[$], $, _) !== !1; )
                ;
            return _
        }
        function Kf(_, A) {
            for (var $ = _ == null ? 0 : _.length; $-- && A(_[$], $, _) !== !1; )
                ;
            return _
        }
        function Au(_, A) {
            for (var $ = -1, G = _ == null ? 0 : _.length; ++$ < G; )
                if (!A(_[$], $, _))
                    return !1;
            return !0
        }
        function xn(_, A) {
            for (var $ = -1, G = _ == null ? 0 : _.length, fe = 0, je = []; ++$ < G; ) {
                var He = _[$];
                A(He, $, _) && (je[fe++] = He)
            }
            return je
        }
        function Ii(_, A) {
            var $ = _ == null ? 0 : _.length;
            return !!$ && fr(_, A, 0) > -1
        }
        function yo(_, A, $) {
            for (var G = -1, fe = _ == null ? 0 : _.length; ++G < fe; )
                if ($(A, _[G]))
                    return !0;
            return !1
        }
        function Le(_, A) {
            for (var $ = -1, G = _ == null ? 0 : _.length, fe = Array(G); ++$ < G; )
                fe[$] = A(_[$], $, _);
            return fe
        }
        function wn(_, A) {
            for (var $ = -1, G = A.length, fe = _.length; ++$ < G; )
                _[fe + $] = A[$];
            return _
        }
        function bo(_, A, $, G) {
            var fe = -1
              , je = _ == null ? 0 : _.length;
            for (G && je && ($ = _[++fe]); ++fe < je; )
                $ = A($, _[fe], fe, _);
            return $
        }
        function Yf(_, A, $, G) {
            var fe = _ == null ? 0 : _.length;
            for (G && fe && ($ = _[--fe]); fe--; )
                $ = A($, _[fe], fe, _);
            return $
        }
        function _o(_, A) {
            for (var $ = -1, G = _ == null ? 0 : _.length; ++$ < G; )
                if (A(_[$], $, _))
                    return !0;
            return !1
        }
        var Xf = xo("length");
        function Jf(_) {
            return _.split("")
        }
        function Qf(_) {
            return _.match(of) || []
        }
        function Cu(_, A, $) {
            var G;
            return $(_, function(fe, je, He) {
                if (A(fe, je, He))
                    return G = je,
                    !1
            }),
            G
        }
        function Di(_, A, $, G) {
            for (var fe = _.length, je = $ + (G ? 1 : -1); G ? je-- : ++je < fe; )
                if (A(_[je], je, _))
                    return je;
            return -1
        }
        function fr(_, A, $) {
            return A === A ? cp(_, A, $) : Di(_, Pu, $)
        }
        function Gf(_, A, $, G) {
            for (var fe = $ - 1, je = _.length; ++fe < je; )
                if (G(_[fe], A))
                    return fe;
            return -1
        }
        function Pu(_) {
            return _ !== _
        }
        function Mu(_, A) {
            var $ = _ == null ? 0 : _.length;
            return $ ? ko(_, A) / $ : me
        }
        function xo(_) {
            return function(A) {
                return A == null ? r : A[_]
            }
        }
        function wo(_) {
            return function(A) {
                return _ == null ? r : _[A]
            }
        }
        function Nu(_, A, $, G, fe) {
            return fe(_, function(je, He, Me) {
                $ = G ? (G = !1,
                je) : A($, je, He, Me)
            }),
            $
        }
        function ep(_, A) {
            var $ = _.length;
            for (_.sort(A); $--; )
                _[$] = _[$].value;
            return _
        }
        function ko(_, A) {
            for (var $, G = -1, fe = _.length; ++G < fe; ) {
                var je = A(_[G]);
                je !== r && ($ = $ === r ? je : $ + je)
            }
            return $
        }
        function So(_, A) {
            for (var $ = -1, G = Array(_); ++$ < _; )
                G[$] = A($);
            return G
        }
        function tp(_, A) {
            return Le(A, function($) {
                return [$, _[$]]
            })
        }
        function zu(_) {
            return _ && _.slice(0, Du(_) + 1).replace(lo, "")
        }
        function gt(_) {
            return function(A) {
                return _(A)
            }
        }
        function Oo(_, A) {
            return Le(A, function($) {
                return _[$]
            })
        }
        function Wr(_, A) {
            return _.has(A)
        }
        function Bu(_, A) {
            for (var $ = -1, G = _.length; ++$ < G && fr(A, _[$], 0) > -1; )
                ;
            return $
        }
        function Lu(_, A) {
            for (var $ = _.length; $-- && fr(A, _[$], 0) > -1; )
                ;
            return $
        }
        function np(_, A) {
            for (var $ = _.length, G = 0; $--; )
                _[$] === A && ++G;
            return G
        }
        var rp = wo(Zf)
          , ip = wo(Rf);
        function ap(_) {
            return "\\" + Wf[_]
        }
        function op(_, A) {
            return _ == null ? r : _[A]
        }
        function pr(_) {
            return Bf.test(_)
        }
        function sp(_) {
            return Lf.test(_)
        }
        function up(_) {
            for (var A, $ = []; !(A = _.next()).done; )
                $.push(A.value);
            return $
        }
        function $o(_) {
            var A = -1
              , $ = Array(_.size);
            return _.forEach(function(G, fe) {
                $[++A] = [fe, G]
            }),
            $
        }
        function Iu(_, A) {
            return function($) {
                return _(A($))
            }
        }
        function kn(_, A) {
            for (var $ = -1, G = _.length, fe = 0, je = []; ++$ < G; ) {
                var He = _[$];
                (He === A || He === y) && (_[$] = y,
                je[fe++] = $)
            }
            return je
        }
        function Zi(_) {
            var A = -1
              , $ = Array(_.size);
            return _.forEach(function(G) {
                $[++A] = G
            }),
            $
        }
        function lp(_) {
            var A = -1
              , $ = Array(_.size);
            return _.forEach(function(G) {
                $[++A] = [G, G]
            }),
            $
        }
        function cp(_, A, $) {
            for (var G = $ - 1, fe = _.length; ++G < fe; )
                if (_[G] === A)
                    return G;
            return -1
        }
        function dp(_, A, $) {
            for (var G = $ + 1; G--; )
                if (_[G] === A)
                    return G;
            return G
        }
        function hr(_) {
            return pr(_) ? pp(_) : Xf(_)
        }
        function Bt(_) {
            return pr(_) ? hp(_) : Jf(_)
        }
        function Du(_) {
            for (var A = _.length; A-- && tf.test(_.charAt(A)); )
                ;
            return A
        }
        var fp = wo(Ff);
        function pp(_) {
            for (var A = vo.lastIndex = 0; vo.test(_); )
                ++A;
            return A
        }
        function hp(_) {
            return _.match(vo) || []
        }
        function vp(_) {
            return _.match(zf) || []
        }
        var gp = function _(A) {
            A = A == null ? Je : vr.defaults(Je.Object(), A, vr.pick(Je, If));
            var $ = A.Array
              , G = A.Date
              , fe = A.Error
              , je = A.Function
              , He = A.Math
              , Me = A.Object
              , To = A.RegExp
              , mp = A.String
              , Ot = A.TypeError
              , Ri = $.prototype
              , yp = je.prototype
              , gr = Me.prototype
              , Fi = A["__core-js_shared__"]
              , Wi = yp.toString
              , Pe = gr.hasOwnProperty
              , bp = 0
              , Zu = function() {
                var e = /[^.]+$/.exec(Fi && Fi.keys && Fi.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }()
              , Vi = gr.toString
              , _p = Wi.call(Me)
              , xp = Je._
              , wp = To("^" + Wi.call(Pe).replace(uo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
              , Ui = ku ? A.Buffer : r
              , Sn = A.Symbol
              , qi = A.Uint8Array
              , Ru = Ui ? Ui.allocUnsafe : r
              , Hi = Iu(Me.getPrototypeOf, Me)
              , Fu = Me.create
              , Wu = gr.propertyIsEnumerable
              , Ki = Ri.splice
              , Vu = Sn ? Sn.isConcatSpreadable : r
              , Vr = Sn ? Sn.iterator : r
              , Un = Sn ? Sn.toStringTag : r
              , Yi = function() {
                try {
                    var e = Xn(Me, "defineProperty");
                    return e({}, "", {}),
                    e
                } catch {}
            }()
              , kp = A.clearTimeout !== Je.clearTimeout && A.clearTimeout
              , Sp = G && G.now !== Je.Date.now && G.now
              , Op = A.setTimeout !== Je.setTimeout && A.setTimeout
              , Xi = He.ceil
              , Ji = He.floor
              , jo = Me.getOwnPropertySymbols
              , $p = Ui ? Ui.isBuffer : r
              , Uu = A.isFinite
              , Tp = Ri.join
              , jp = Iu(Me.keys, Me)
              , Ke = He.max
              , et = He.min
              , Ep = G.now
              , Ap = A.parseInt
              , qu = He.random
              , Cp = Ri.reverse
              , Eo = Xn(A, "DataView")
              , Ur = Xn(A, "Map")
              , Ao = Xn(A, "Promise")
              , mr = Xn(A, "Set")
              , qr = Xn(A, "WeakMap")
              , Hr = Xn(Me, "create")
              , Qi = qr && new qr
              , yr = {}
              , Pp = Jn(Eo)
              , Mp = Jn(Ur)
              , Np = Jn(Ao)
              , zp = Jn(mr)
              , Bp = Jn(qr)
              , Gi = Sn ? Sn.prototype : r
              , Kr = Gi ? Gi.valueOf : r
              , Hu = Gi ? Gi.toString : r;
            function p(e) {
                if (Fe(e) && !pe(e) && !(e instanceof we)) {
                    if (e instanceof $t)
                        return e;
                    if (Pe.call(e, "__wrapped__"))
                        return Kl(e)
                }
                return new $t(e)
            }
            var br = function() {
                function e() {}
                return function(t) {
                    if (!Ie(t))
                        return {};
                    if (Fu)
                        return Fu(t);
                    e.prototype = t;
                    var a = new e;
                    return e.prototype = r,
                    a
                }
            }();
            function ea() {}
            function $t(e, t) {
                this.__wrapped__ = e,
                this.__actions__ = [],
                this.__chain__ = !!t,
                this.__index__ = 0,
                this.__values__ = r
            }
            p.templateSettings = {
                escape: Yd,
                evaluate: Xd,
                interpolate: nu,
                variable: "",
                imports: {
                    _: p
                }
            },
            p.prototype = ea.prototype,
            p.prototype.constructor = p,
            $t.prototype = br(ea.prototype),
            $t.prototype.constructor = $t;
            function we(e) {
                this.__wrapped__ = e,
                this.__actions__ = [],
                this.__dir__ = 1,
                this.__filtered__ = !1,
                this.__iteratees__ = [],
                this.__takeCount__ = ce,
                this.__views__ = []
            }
            function Lp() {
                var e = new we(this.__wrapped__);
                return e.__actions__ = ct(this.__actions__),
                e.__dir__ = this.__dir__,
                e.__filtered__ = this.__filtered__,
                e.__iteratees__ = ct(this.__iteratees__),
                e.__takeCount__ = this.__takeCount__,
                e.__views__ = ct(this.__views__),
                e
            }
            function Ip() {
                if (this.__filtered__) {
                    var e = new we(this);
                    e.__dir__ = -1,
                    e.__filtered__ = !0
                } else
                    e = this.clone(),
                    e.__dir__ *= -1;
                return e
            }
            function Dp() {
                var e = this.__wrapped__.value()
                  , t = this.__dir__
                  , a = pe(e)
                  , u = t < 0
                  , d = a ? e.length : 0
                  , h = Jh(0, d, this.__views__)
                  , m = h.start
                  , b = h.end
                  , x = b - m
                  , M = u ? b : m - 1
                  , z = this.__iteratees__
                  , R = z.length
                  , X = 0
                  , re = et(x, this.__takeCount__);
                if (!a || !u && d == x && re == x)
                    return ml(e, this.__actions__);
                var se = [];
                e: for (; x-- && X < re; ) {
                    M += t;
                    for (var ye = -1, ue = e[M]; ++ye < R; ) {
                        var xe = z[ye]
                          , Oe = xe.iteratee
                          , bt = xe.type
                          , ot = Oe(ue);
                        if (bt == C)
                            ue = ot;
                        else if (!ot) {
                            if (bt == E)
                                continue e;
                            break e
                        }
                    }
                    se[X++] = ue
                }
                return se
            }
            we.prototype = br(ea.prototype),
            we.prototype.constructor = we;
            function qn(e) {
                var t = -1
                  , a = e == null ? 0 : e.length;
                for (this.clear(); ++t < a; ) {
                    var u = e[t];
                    this.set(u[0], u[1])
                }
            }
            function Zp() {
                this.__data__ = Hr ? Hr(null) : {},
                this.size = 0
            }
            function Rp(e) {
                var t = this.has(e) && delete this.__data__[e];
                return this.size -= t ? 1 : 0,
                t
            }
            function Fp(e) {
                var t = this.__data__;
                if (Hr) {
                    var a = t[e];
                    return a === v ? r : a
                }
                return Pe.call(t, e) ? t[e] : r
            }
            function Wp(e) {
                var t = this.__data__;
                return Hr ? t[e] !== r : Pe.call(t, e)
            }
            function Vp(e, t) {
                var a = this.__data__;
                return this.size += this.has(e) ? 0 : 1,
                a[e] = Hr && t === r ? v : t,
                this
            }
            qn.prototype.clear = Zp,
            qn.prototype.delete = Rp,
            qn.prototype.get = Fp,
            qn.prototype.has = Wp,
            qn.prototype.set = Vp;
            function nn(e) {
                var t = -1
                  , a = e == null ? 0 : e.length;
                for (this.clear(); ++t < a; ) {
                    var u = e[t];
                    this.set(u[0], u[1])
                }
            }
            function Up() {
                this.__data__ = [],
                this.size = 0
            }
            function qp(e) {
                var t = this.__data__
                  , a = ta(t, e);
                if (a < 0)
                    return !1;
                var u = t.length - 1;
                return a == u ? t.pop() : Ki.call(t, a, 1),
                --this.size,
                !0
            }
            function Hp(e) {
                var t = this.__data__
                  , a = ta(t, e);
                return a < 0 ? r : t[a][1]
            }
            function Kp(e) {
                return ta(this.__data__, e) > -1
            }
            function Yp(e, t) {
                var a = this.__data__
                  , u = ta(a, e);
                return u < 0 ? (++this.size,
                a.push([e, t])) : a[u][1] = t,
                this
            }
            nn.prototype.clear = Up,
            nn.prototype.delete = qp,
            nn.prototype.get = Hp,
            nn.prototype.has = Kp,
            nn.prototype.set = Yp;
            function rn(e) {
                var t = -1
                  , a = e == null ? 0 : e.length;
                for (this.clear(); ++t < a; ) {
                    var u = e[t];
                    this.set(u[0], u[1])
                }
            }
            function Xp() {
                this.size = 0,
                this.__data__ = {
                    hash: new qn,
                    map: new (Ur || nn),
                    string: new qn
                }
            }
            function Jp(e) {
                var t = pa(this, e).delete(e);
                return this.size -= t ? 1 : 0,
                t
            }
            function Qp(e) {
                return pa(this, e).get(e)
            }
            function Gp(e) {
                return pa(this, e).has(e)
            }
            function eh(e, t) {
                var a = pa(this, e)
                  , u = a.size;
                return a.set(e, t),
                this.size += a.size == u ? 0 : 1,
                this
            }
            rn.prototype.clear = Xp,
            rn.prototype.delete = Jp,
            rn.prototype.get = Qp,
            rn.prototype.has = Gp,
            rn.prototype.set = eh;
            function Hn(e) {
                var t = -1
                  , a = e == null ? 0 : e.length;
                for (this.__data__ = new rn; ++t < a; )
                    this.add(e[t])
            }
            function th(e) {
                return this.__data__.set(e, v),
                this
            }
            function nh(e) {
                return this.__data__.has(e)
            }
            Hn.prototype.add = Hn.prototype.push = th,
            Hn.prototype.has = nh;
            function Lt(e) {
                var t = this.__data__ = new nn(e);
                this.size = t.size
            }
            function rh() {
                this.__data__ = new nn,
                this.size = 0
            }
            function ih(e) {
                var t = this.__data__
                  , a = t.delete(e);
                return this.size = t.size,
                a
            }
            function ah(e) {
                return this.__data__.get(e)
            }
            function oh(e) {
                return this.__data__.has(e)
            }
            function sh(e, t) {
                var a = this.__data__;
                if (a instanceof nn) {
                    var u = a.__data__;
                    if (!Ur || u.length < s - 1)
                        return u.push([e, t]),
                        this.size = ++a.size,
                        this;
                    a = this.__data__ = new rn(u)
                }
                return a.set(e, t),
                this.size = a.size,
                this
            }
            Lt.prototype.clear = rh,
            Lt.prototype.delete = ih,
            Lt.prototype.get = ah,
            Lt.prototype.has = oh,
            Lt.prototype.set = sh;
            function Ku(e, t) {
                var a = pe(e)
                  , u = !a && Qn(e)
                  , d = !a && !u && En(e)
                  , h = !a && !u && !d && kr(e)
                  , m = a || u || d || h
                  , b = m ? So(e.length, mp) : []
                  , x = b.length;
                for (var M in e)
                    (t || Pe.call(e, M)) && !(m && (M == "length" || d && (M == "offset" || M == "parent") || h && (M == "buffer" || M == "byteLength" || M == "byteOffset") || un(M, x))) && b.push(M);
                return b
            }
            function Yu(e) {
                var t = e.length;
                return t ? e[Ro(0, t - 1)] : r
            }
            function uh(e, t) {
                return ha(ct(e), Kn(t, 0, e.length))
            }
            function lh(e) {
                return ha(ct(e))
            }
            function Co(e, t, a) {
                (a !== r && !It(e[t], a) || a === r && !(t in e)) && an(e, t, a)
            }
            function Yr(e, t, a) {
                var u = e[t];
                (!(Pe.call(e, t) && It(u, a)) || a === r && !(t in e)) && an(e, t, a)
            }
            function ta(e, t) {
                for (var a = e.length; a--; )
                    if (It(e[a][0], t))
                        return a;
                return -1
            }
            function ch(e, t, a, u) {
                return On(e, function(d, h, m) {
                    t(u, d, a(d), m)
                }),
                u
            }
            function Xu(e, t) {
                return e && Kt(t, Ye(t), e)
            }
            function dh(e, t) {
                return e && Kt(t, ft(t), e)
            }
            function an(e, t, a) {
                t == "__proto__" && Yi ? Yi(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: a,
                    writable: !0
                }) : e[t] = a
            }
            function Po(e, t) {
                for (var a = -1, u = t.length, d = $(u), h = e == null; ++a < u; )
                    d[a] = h ? r : fs(e, t[a]);
                return d
            }
            function Kn(e, t, a) {
                return e === e && (a !== r && (e = e <= a ? e : a),
                t !== r && (e = e >= t ? e : t)),
                e
            }
            function Tt(e, t, a, u, d, h) {
                var m, b = t & O, x = t & N, M = t & k;
                if (a && (m = d ? a(e, u, d, h) : a(e)),
                m !== r)
                    return m;
                if (!Ie(e))
                    return e;
                var z = pe(e);
                if (z) {
                    if (m = Gh(e),
                    !b)
                        return ct(e, m)
                } else {
                    var R = tt(e)
                      , X = R == en || R == Qs;
                    if (En(e))
                        return _l(e, b);
                    if (R == tn || R == rt || X && !d) {
                        if (m = x || X ? {} : Dl(e),
                        !b)
                            return x ? Fh(e, dh(m, e)) : Rh(e, Xu(m, e))
                    } else {
                        if (!Ne[R])
                            return d ? e : {};
                        m = ev(e, R, b)
                    }
                }
                h || (h = new Lt);
                var re = h.get(e);
                if (re)
                    return re;
                h.set(e, m),
                hc(e) ? e.forEach(function(ue) {
                    m.add(Tt(ue, t, a, ue, e, h))
                }) : fc(e) && e.forEach(function(ue, xe) {
                    m.set(xe, Tt(ue, t, a, xe, e, h))
                });
                var se = M ? x ? Qo : Jo : x ? ft : Ye
                  , ye = z ? r : se(e);
                return St(ye || e, function(ue, xe) {
                    ye && (xe = ue,
                    ue = e[xe]),
                    Yr(m, xe, Tt(ue, t, a, xe, e, h))
                }),
                m
            }
            function fh(e) {
                var t = Ye(e);
                return function(a) {
                    return Ju(a, e, t)
                }
            }
            function Ju(e, t, a) {
                var u = a.length;
                if (e == null)
                    return !u;
                for (e = Me(e); u--; ) {
                    var d = a[u]
                      , h = t[d]
                      , m = e[d];
                    if (m === r && !(d in e) || !h(m))
                        return !1
                }
                return !0
            }
            function Qu(e, t, a) {
                if (typeof e != "function")
                    throw new Ot(c);
                return ni(function() {
                    e.apply(r, a)
                }, t)
            }
            function Xr(e, t, a, u) {
                var d = -1
                  , h = Ii
                  , m = !0
                  , b = e.length
                  , x = []
                  , M = t.length;
                if (!b)
                    return x;
                a && (t = Le(t, gt(a))),
                u ? (h = yo,
                m = !1) : t.length >= s && (h = Wr,
                m = !1,
                t = new Hn(t));
                e: for (; ++d < b; ) {
                    var z = e[d]
                      , R = a == null ? z : a(z);
                    if (z = u || z !== 0 ? z : 0,
                    m && R === R) {
                        for (var X = M; X--; )
                            if (t[X] === R)
                                continue e;
                        x.push(z)
                    } else
                        h(t, R, u) || x.push(z)
                }
                return x
            }
            var On = Ol(Ht)
              , Gu = Ol(No, !0);
            function ph(e, t) {
                var a = !0;
                return On(e, function(u, d, h) {
                    return a = !!t(u, d, h),
                    a
                }),
                a
            }
            function na(e, t, a) {
                for (var u = -1, d = e.length; ++u < d; ) {
                    var h = e[u]
                      , m = t(h);
                    if (m != null && (b === r ? m === m && !yt(m) : a(m, b)))
                        var b = m
                          , x = h
                }
                return x
            }
            function hh(e, t, a, u) {
                var d = e.length;
                for (a = ge(a),
                a < 0 && (a = -a > d ? 0 : d + a),
                u = u === r || u > d ? d : ge(u),
                u < 0 && (u += d),
                u = a > u ? 0 : gc(u); a < u; )
                    e[a++] = t;
                return e
            }
            function el(e, t) {
                var a = [];
                return On(e, function(u, d, h) {
                    t(u, d, h) && a.push(u)
                }),
                a
            }
            function Qe(e, t, a, u, d) {
                var h = -1
                  , m = e.length;
                for (a || (a = nv),
                d || (d = []); ++h < m; ) {
                    var b = e[h];
                    t > 0 && a(b) ? t > 1 ? Qe(b, t - 1, a, u, d) : wn(d, b) : u || (d[d.length] = b)
                }
                return d
            }
            var Mo = $l()
              , tl = $l(!0);
            function Ht(e, t) {
                return e && Mo(e, t, Ye)
            }
            function No(e, t) {
                return e && tl(e, t, Ye)
            }
            function ra(e, t) {
                return xn(t, function(a) {
                    return ln(e[a])
                })
            }
            function Yn(e, t) {
                t = Tn(t, e);
                for (var a = 0, u = t.length; e != null && a < u; )
                    e = e[Yt(t[a++])];
                return a && a == u ? e : r
            }
            function nl(e, t, a) {
                var u = t(e);
                return pe(e) ? u : wn(u, a(e))
            }
            function it(e) {
                return e == null ? e === r ? Fd : Zd : Un && Un in Me(e) ? Xh(e) : lv(e)
            }
            function zo(e, t) {
                return e > t
            }
            function vh(e, t) {
                return e != null && Pe.call(e, t)
            }
            function gh(e, t) {
                return e != null && t in Me(e)
            }
            function mh(e, t, a) {
                return e >= et(t, a) && e < Ke(t, a)
            }
            function Bo(e, t, a) {
                for (var u = a ? yo : Ii, d = e[0].length, h = e.length, m = h, b = $(h), x = 1 / 0, M = []; m--; ) {
                    var z = e[m];
                    m && t && (z = Le(z, gt(t))),
                    x = et(z.length, x),
                    b[m] = !a && (t || d >= 120 && z.length >= 120) ? new Hn(m && z) : r
                }
                z = e[0];
                var R = -1
                  , X = b[0];
                e: for (; ++R < d && M.length < x; ) {
                    var re = z[R]
                      , se = t ? t(re) : re;
                    if (re = a || re !== 0 ? re : 0,
                    !(X ? Wr(X, se) : u(M, se, a))) {
                        for (m = h; --m; ) {
                            var ye = b[m];
                            if (!(ye ? Wr(ye, se) : u(e[m], se, a)))
                                continue e
                        }
                        X && X.push(se),
                        M.push(re)
                    }
                }
                return M
            }
            function yh(e, t, a, u) {
                return Ht(e, function(d, h, m) {
                    t(u, a(d), h, m)
                }),
                u
            }
            function Jr(e, t, a) {
                t = Tn(t, e),
                e = Wl(e, t);
                var u = e == null ? e : e[Yt(Et(t))];
                return u == null ? r : vt(u, e, a)
            }
            function rl(e) {
                return Fe(e) && it(e) == rt
            }
            function bh(e) {
                return Fe(e) && it(e) == Fr
            }
            function _h(e) {
                return Fe(e) && it(e) == Ue
            }
            function Qr(e, t, a, u, d) {
                return e === t ? !0 : e == null || t == null || !Fe(e) && !Fe(t) ? e !== e && t !== t : xh(e, t, a, u, Qr, d)
            }
            function xh(e, t, a, u, d, h) {
                var m = pe(e)
                  , b = pe(t)
                  , x = m ? wt : tt(e)
                  , M = b ? wt : tt(t);
                x = x == rt ? tn : x,
                M = M == rt ? tn : M;
                var z = x == tn
                  , R = M == tn
                  , X = x == M;
                if (X && En(e)) {
                    if (!En(t))
                        return !1;
                    m = !0,
                    z = !1
                }
                if (X && !z)
                    return h || (h = new Lt),
                    m || kr(e) ? Bl(e, t, a, u, d, h) : Kh(e, t, x, a, u, d, h);
                if (!(a & w)) {
                    var re = z && Pe.call(e, "__wrapped__")
                      , se = R && Pe.call(t, "__wrapped__");
                    if (re || se) {
                        var ye = re ? e.value() : e
                          , ue = se ? t.value() : t;
                        return h || (h = new Lt),
                        d(ye, ue, a, u, h)
                    }
                }
                return X ? (h || (h = new Lt),
                Yh(e, t, a, u, d, h)) : !1
            }
            function wh(e) {
                return Fe(e) && tt(e) == Nt
            }
            function Lo(e, t, a, u) {
                var d = a.length
                  , h = d
                  , m = !u;
                if (e == null)
                    return !h;
                for (e = Me(e); d--; ) {
                    var b = a[d];
                    if (m && b[2] ? b[1] !== e[b[0]] : !(b[0]in e))
                        return !1
                }
                for (; ++d < h; ) {
                    b = a[d];
                    var x = b[0]
                      , M = e[x]
                      , z = b[1];
                    if (m && b[2]) {
                        if (M === r && !(x in e))
                            return !1
                    } else {
                        var R = new Lt;
                        if (u)
                            var X = u(M, z, x, e, t, R);
                        if (!(X === r ? Qr(z, M, w | P, u, R) : X))
                            return !1
                    }
                }
                return !0
            }
            function il(e) {
                if (!Ie(e) || iv(e))
                    return !1;
                var t = ln(e) ? wp : ff;
                return t.test(Jn(e))
            }
            function kh(e) {
                return Fe(e) && it(e) == Dr
            }
            function Sh(e) {
                return Fe(e) && tt(e) == zt
            }
            function Oh(e) {
                return Fe(e) && _a(e.length) && !!ze[it(e)]
            }
            function al(e) {
                return typeof e == "function" ? e : e == null ? pt : typeof e == "object" ? pe(e) ? ul(e[0], e[1]) : sl(e) : Tc(e)
            }
            function Io(e) {
                if (!ti(e))
                    return jp(e);
                var t = [];
                for (var a in Me(e))
                    Pe.call(e, a) && a != "constructor" && t.push(a);
                return t
            }
            function $h(e) {
                if (!Ie(e))
                    return uv(e);
                var t = ti(e)
                  , a = [];
                for (var u in e)
                    u == "constructor" && (t || !Pe.call(e, u)) || a.push(u);
                return a
            }
            function Do(e, t) {
                return e < t
            }
            function ol(e, t) {
                var a = -1
                  , u = dt(e) ? $(e.length) : [];
                return On(e, function(d, h, m) {
                    u[++a] = t(d, h, m)
                }),
                u
            }
            function sl(e) {
                var t = es(e);
                return t.length == 1 && t[0][2] ? Rl(t[0][0], t[0][1]) : function(a) {
                    return a === e || Lo(a, e, t)
                }
            }
            function ul(e, t) {
                return ns(e) && Zl(t) ? Rl(Yt(e), t) : function(a) {
                    var u = fs(a, e);
                    return u === r && u === t ? ps(a, e) : Qr(t, u, w | P)
                }
            }
            function ia(e, t, a, u, d) {
                e !== t && Mo(t, function(h, m) {
                    if (d || (d = new Lt),
                    Ie(h))
                        Th(e, t, m, a, ia, u, d);
                    else {
                        var b = u ? u(is(e, m), h, m + "", e, t, d) : r;
                        b === r && (b = h),
                        Co(e, m, b)
                    }
                }, ft)
            }
            function Th(e, t, a, u, d, h, m) {
                var b = is(e, a)
                  , x = is(t, a)
                  , M = m.get(x);
                if (M) {
                    Co(e, a, M);
                    return
                }
                var z = h ? h(b, x, a + "", e, t, m) : r
                  , R = z === r;
                if (R) {
                    var X = pe(x)
                      , re = !X && En(x)
                      , se = !X && !re && kr(x);
                    z = x,
                    X || re || se ? pe(b) ? z = b : We(b) ? z = ct(b) : re ? (R = !1,
                    z = _l(x, !0)) : se ? (R = !1,
                    z = xl(x, !0)) : z = [] : ri(x) || Qn(x) ? (z = b,
                    Qn(b) ? z = mc(b) : (!Ie(b) || ln(b)) && (z = Dl(x))) : R = !1
                }
                R && (m.set(x, z),
                d(z, x, u, h, m),
                m.delete(x)),
                Co(e, a, z)
            }
            function ll(e, t) {
                var a = e.length;
                if (a)
                    return t += t < 0 ? a : 0,
                    un(t, a) ? e[t] : r
            }
            function cl(e, t, a) {
                t.length ? t = Le(t, function(h) {
                    return pe(h) ? function(m) {
                        return Yn(m, h.length === 1 ? h[0] : h)
                    }
                    : h
                }) : t = [pt];
                var u = -1;
                t = Le(t, gt(oe()));
                var d = ol(e, function(h, m, b) {
                    var x = Le(t, function(M) {
                        return M(h)
                    });
                    return {
                        criteria: x,
                        index: ++u,
                        value: h
                    }
                });
                return ep(d, function(h, m) {
                    return Zh(h, m, a)
                })
            }
            function jh(e, t) {
                return dl(e, t, function(a, u) {
                    return ps(e, u)
                })
            }
            function dl(e, t, a) {
                for (var u = -1, d = t.length, h = {}; ++u < d; ) {
                    var m = t[u]
                      , b = Yn(e, m);
                    a(b, m) && Gr(h, Tn(m, e), b)
                }
                return h
            }
            function Eh(e) {
                return function(t) {
                    return Yn(t, e)
                }
            }
            function Zo(e, t, a, u) {
                var d = u ? Gf : fr
                  , h = -1
                  , m = t.length
                  , b = e;
                for (e === t && (t = ct(t)),
                a && (b = Le(e, gt(a))); ++h < m; )
                    for (var x = 0, M = t[h], z = a ? a(M) : M; (x = d(b, z, x, u)) > -1; )
                        b !== e && Ki.call(b, x, 1),
                        Ki.call(e, x, 1);
                return e
            }
            function fl(e, t) {
                for (var a = e ? t.length : 0, u = a - 1; a--; ) {
                    var d = t[a];
                    if (a == u || d !== h) {
                        var h = d;
                        un(d) ? Ki.call(e, d, 1) : Vo(e, d)
                    }
                }
                return e
            }
            function Ro(e, t) {
                return e + Ji(qu() * (t - e + 1))
            }
            function Ah(e, t, a, u) {
                for (var d = -1, h = Ke(Xi((t - e) / (a || 1)), 0), m = $(h); h--; )
                    m[u ? h : ++d] = e,
                    e += a;
                return m
            }
            function Fo(e, t) {
                var a = "";
                if (!e || t < 1 || t > K)
                    return a;
                do
                    t % 2 && (a += e),
                    t = Ji(t / 2),
                    t && (e += e);
                while (t);
                return a
            }
            function _e(e, t) {
                return as(Fl(e, t, pt), e + "")
            }
            function Ch(e) {
                return Yu(Sr(e))
            }
            function Ph(e, t) {
                var a = Sr(e);
                return ha(a, Kn(t, 0, a.length))
            }
            function Gr(e, t, a, u) {
                if (!Ie(e))
                    return e;
                t = Tn(t, e);
                for (var d = -1, h = t.length, m = h - 1, b = e; b != null && ++d < h; ) {
                    var x = Yt(t[d])
                      , M = a;
                    if (x === "__proto__" || x === "constructor" || x === "prototype")
                        return e;
                    if (d != m) {
                        var z = b[x];
                        M = u ? u(z, x, b) : r,
                        M === r && (M = Ie(z) ? z : un(t[d + 1]) ? [] : {})
                    }
                    Yr(b, x, M),
                    b = b[x]
                }
                return e
            }
            var pl = Qi ? function(e, t) {
                return Qi.set(e, t),
                e
            }
            : pt
              , Mh = Yi ? function(e, t) {
                return Yi(e, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: vs(t),
                    writable: !0
                })
            }
            : pt;
            function Nh(e) {
                return ha(Sr(e))
            }
            function jt(e, t, a) {
                var u = -1
                  , d = e.length;
                t < 0 && (t = -t > d ? 0 : d + t),
                a = a > d ? d : a,
                a < 0 && (a += d),
                d = t > a ? 0 : a - t >>> 0,
                t >>>= 0;
                for (var h = $(d); ++u < d; )
                    h[u] = e[u + t];
                return h
            }
            function zh(e, t) {
                var a;
                return On(e, function(u, d, h) {
                    return a = t(u, d, h),
                    !a
                }),
                !!a
            }
            function aa(e, t, a) {
                var u = 0
                  , d = e == null ? u : e.length;
                if (typeof t == "number" && t === t && d <= Re) {
                    for (; u < d; ) {
                        var h = u + d >>> 1
                          , m = e[h];
                        m !== null && !yt(m) && (a ? m <= t : m < t) ? u = h + 1 : d = h
                    }
                    return d
                }
                return Wo(e, t, pt, a)
            }
            function Wo(e, t, a, u) {
                var d = 0
                  , h = e == null ? 0 : e.length;
                if (h === 0)
                    return 0;
                t = a(t);
                for (var m = t !== t, b = t === null, x = yt(t), M = t === r; d < h; ) {
                    var z = Ji((d + h) / 2)
                      , R = a(e[z])
                      , X = R !== r
                      , re = R === null
                      , se = R === R
                      , ye = yt(R);
                    if (m)
                        var ue = u || se;
                    else
                        M ? ue = se && (u || X) : b ? ue = se && X && (u || !re) : x ? ue = se && X && !re && (u || !ye) : re || ye ? ue = !1 : ue = u ? R <= t : R < t;
                    ue ? d = z + 1 : h = z
                }
                return et(h, Ce)
            }
            function hl(e, t) {
                for (var a = -1, u = e.length, d = 0, h = []; ++a < u; ) {
                    var m = e[a]
                      , b = t ? t(m) : m;
                    if (!a || !It(b, x)) {
                        var x = b;
                        h[d++] = m === 0 ? 0 : m
                    }
                }
                return h
            }
            function vl(e) {
                return typeof e == "number" ? e : yt(e) ? me : +e
            }
            function mt(e) {
                if (typeof e == "string")
                    return e;
                if (pe(e))
                    return Le(e, mt) + "";
                if (yt(e))
                    return Hu ? Hu.call(e) : "";
                var t = e + "";
                return t == "0" && 1 / e == -B ? "-0" : t
            }
            function $n(e, t, a) {
                var u = -1
                  , d = Ii
                  , h = e.length
                  , m = !0
                  , b = []
                  , x = b;
                if (a)
                    m = !1,
                    d = yo;
                else if (h >= s) {
                    var M = t ? null : qh(e);
                    if (M)
                        return Zi(M);
                    m = !1,
                    d = Wr,
                    x = new Hn
                } else
                    x = t ? [] : b;
                e: for (; ++u < h; ) {
                    var z = e[u]
                      , R = t ? t(z) : z;
                    if (z = a || z !== 0 ? z : 0,
                    m && R === R) {
                        for (var X = x.length; X--; )
                            if (x[X] === R)
                                continue e;
                        t && x.push(R),
                        b.push(z)
                    } else
                        d(x, R, a) || (x !== b && x.push(R),
                        b.push(z))
                }
                return b
            }
            function Vo(e, t) {
                return t = Tn(t, e),
                e = Wl(e, t),
                e == null || delete e[Yt(Et(t))]
            }
            function gl(e, t, a, u) {
                return Gr(e, t, a(Yn(e, t)), u)
            }
            function oa(e, t, a, u) {
                for (var d = e.length, h = u ? d : -1; (u ? h-- : ++h < d) && t(e[h], h, e); )
                    ;
                return a ? jt(e, u ? 0 : h, u ? h + 1 : d) : jt(e, u ? h + 1 : 0, u ? d : h)
            }
            function ml(e, t) {
                var a = e;
                return a instanceof we && (a = a.value()),
                bo(t, function(u, d) {
                    return d.func.apply(d.thisArg, wn([u], d.args))
                }, a)
            }
            function Uo(e, t, a) {
                var u = e.length;
                if (u < 2)
                    return u ? $n(e[0]) : [];
                for (var d = -1, h = $(u); ++d < u; )
                    for (var m = e[d], b = -1; ++b < u; )
                        b != d && (h[d] = Xr(h[d] || m, e[b], t, a));
                return $n(Qe(h, 1), t, a)
            }
            function yl(e, t, a) {
                for (var u = -1, d = e.length, h = t.length, m = {}; ++u < d; ) {
                    var b = u < h ? t[u] : r;
                    a(m, e[u], b)
                }
                return m
            }
            function qo(e) {
                return We(e) ? e : []
            }
            function Ho(e) {
                return typeof e == "function" ? e : pt
            }
            function Tn(e, t) {
                return pe(e) ? e : ns(e, t) ? [e] : Hl(Ae(e))
            }
            var Bh = _e;
            function jn(e, t, a) {
                var u = e.length;
                return a = a === r ? u : a,
                !t && a >= u ? e : jt(e, t, a)
            }
            var bl = kp || function(e) {
                return Je.clearTimeout(e)
            }
            ;
            function _l(e, t) {
                if (t)
                    return e.slice();
                var a = e.length
                  , u = Ru ? Ru(a) : new e.constructor(a);
                return e.copy(u),
                u
            }
            function Ko(e) {
                var t = new e.constructor(e.byteLength);
                return new qi(t).set(new qi(e)),
                t
            }
            function Lh(e, t) {
                var a = t ? Ko(e.buffer) : e.buffer;
                return new e.constructor(a,e.byteOffset,e.byteLength)
            }
            function Ih(e) {
                var t = new e.constructor(e.source,ru.exec(e));
                return t.lastIndex = e.lastIndex,
                t
            }
            function Dh(e) {
                return Kr ? Me(Kr.call(e)) : {}
            }
            function xl(e, t) {
                var a = t ? Ko(e.buffer) : e.buffer;
                return new e.constructor(a,e.byteOffset,e.length)
            }
            function wl(e, t) {
                if (e !== t) {
                    var a = e !== r
                      , u = e === null
                      , d = e === e
                      , h = yt(e)
                      , m = t !== r
                      , b = t === null
                      , x = t === t
                      , M = yt(t);
                    if (!b && !M && !h && e > t || h && m && x && !b && !M || u && m && x || !a && x || !d)
                        return 1;
                    if (!u && !h && !M && e < t || M && a && d && !u && !h || b && a && d || !m && d || !x)
                        return -1
                }
                return 0
            }
            function Zh(e, t, a) {
                for (var u = -1, d = e.criteria, h = t.criteria, m = d.length, b = a.length; ++u < m; ) {
                    var x = wl(d[u], h[u]);
                    if (x) {
                        if (u >= b)
                            return x;
                        var M = a[u];
                        return x * (M == "desc" ? -1 : 1)
                    }
                }
                return e.index - t.index
            }
            function kl(e, t, a, u) {
                for (var d = -1, h = e.length, m = a.length, b = -1, x = t.length, M = Ke(h - m, 0), z = $(x + M), R = !u; ++b < x; )
                    z[b] = t[b];
                for (; ++d < m; )
                    (R || d < h) && (z[a[d]] = e[d]);
                for (; M--; )
                    z[b++] = e[d++];
                return z
            }
            function Sl(e, t, a, u) {
                for (var d = -1, h = e.length, m = -1, b = a.length, x = -1, M = t.length, z = Ke(h - b, 0), R = $(z + M), X = !u; ++d < z; )
                    R[d] = e[d];
                for (var re = d; ++x < M; )
                    R[re + x] = t[x];
                for (; ++m < b; )
                    (X || d < h) && (R[re + a[m]] = e[d++]);
                return R
            }
            function ct(e, t) {
                var a = -1
                  , u = e.length;
                for (t || (t = $(u)); ++a < u; )
                    t[a] = e[a];
                return t
            }
            function Kt(e, t, a, u) {
                var d = !a;
                a || (a = {});
                for (var h = -1, m = t.length; ++h < m; ) {
                    var b = t[h]
                      , x = u ? u(a[b], e[b], b, a, e) : r;
                    x === r && (x = e[b]),
                    d ? an(a, b, x) : Yr(a, b, x)
                }
                return a
            }
            function Rh(e, t) {
                return Kt(e, ts(e), t)
            }
            function Fh(e, t) {
                return Kt(e, Ll(e), t)
            }
            function sa(e, t) {
                return function(a, u) {
                    var d = pe(a) ? Hf : ch
                      , h = t ? t() : {};
                    return d(a, e, oe(u, 2), h)
                }
            }
            function _r(e) {
                return _e(function(t, a) {
                    var u = -1
                      , d = a.length
                      , h = d > 1 ? a[d - 1] : r
                      , m = d > 2 ? a[2] : r;
                    for (h = e.length > 3 && typeof h == "function" ? (d--,
                    h) : r,
                    m && at(a[0], a[1], m) && (h = d < 3 ? r : h,
                    d = 1),
                    t = Me(t); ++u < d; ) {
                        var b = a[u];
                        b && e(t, b, u, h)
                    }
                    return t
                })
            }
            function Ol(e, t) {
                return function(a, u) {
                    if (a == null)
                        return a;
                    if (!dt(a))
                        return e(a, u);
                    for (var d = a.length, h = t ? d : -1, m = Me(a); (t ? h-- : ++h < d) && u(m[h], h, m) !== !1; )
                        ;
                    return a
                }
            }
            function $l(e) {
                return function(t, a, u) {
                    for (var d = -1, h = Me(t), m = u(t), b = m.length; b--; ) {
                        var x = m[e ? b : ++d];
                        if (a(h[x], x, h) === !1)
                            break
                    }
                    return t
                }
            }
            function Wh(e, t, a) {
                var u = t & S
                  , d = ei(e);
                function h() {
                    var m = this && this !== Je && this instanceof h ? d : e;
                    return m.apply(u ? a : this, arguments)
                }
                return h
            }
            function Tl(e) {
                return function(t) {
                    t = Ae(t);
                    var a = pr(t) ? Bt(t) : r
                      , u = a ? a[0] : t.charAt(0)
                      , d = a ? jn(a, 1).join("") : t.slice(1);
                    return u[e]() + d
                }
            }
            function xr(e) {
                return function(t) {
                    return bo(Oc(Sc(t).replace(Mf, "")), e, "")
                }
            }
            function ei(e) {
                return function() {
                    var t = arguments;
                    switch (t.length) {
                    case 0:
                        return new e;
                    case 1:
                        return new e(t[0]);
                    case 2:
                        return new e(t[0],t[1]);
                    case 3:
                        return new e(t[0],t[1],t[2]);
                    case 4:
                        return new e(t[0],t[1],t[2],t[3]);
                    case 5:
                        return new e(t[0],t[1],t[2],t[3],t[4]);
                    case 6:
                        return new e(t[0],t[1],t[2],t[3],t[4],t[5]);
                    case 7:
                        return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])
                    }
                    var a = br(e.prototype)
                      , u = e.apply(a, t);
                    return Ie(u) ? u : a
                }
            }
            function Vh(e, t, a) {
                var u = ei(e);
                function d() {
                    for (var h = arguments.length, m = $(h), b = h, x = wr(d); b--; )
                        m[b] = arguments[b];
                    var M = h < 3 && m[0] !== x && m[h - 1] !== x ? [] : kn(m, x);
                    if (h -= M.length,
                    h < a)
                        return Pl(e, t, ua, d.placeholder, r, m, M, r, r, a - h);
                    var z = this && this !== Je && this instanceof d ? u : e;
                    return vt(z, this, m)
                }
                return d
            }
            function jl(e) {
                return function(t, a, u) {
                    var d = Me(t);
                    if (!dt(t)) {
                        var h = oe(a, 3);
                        t = Ye(t),
                        a = function(b) {
                            return h(d[b], b, d)
                        }
                    }
                    var m = e(t, a, u);
                    return m > -1 ? d[h ? t[m] : m] : r
                }
            }
            function El(e) {
                return sn(function(t) {
                    var a = t.length
                      , u = a
                      , d = $t.prototype.thru;
                    for (e && t.reverse(); u--; ) {
                        var h = t[u];
                        if (typeof h != "function")
                            throw new Ot(c);
                        if (d && !m && fa(h) == "wrapper")
                            var m = new $t([],!0)
                    }
                    for (u = m ? u : a; ++u < a; ) {
                        h = t[u];
                        var b = fa(h)
                          , x = b == "wrapper" ? Go(h) : r;
                        x && rs(x[0]) && x[1] == (T | j | W | L) && !x[4].length && x[9] == 1 ? m = m[fa(x[0])].apply(m, x[3]) : m = h.length == 1 && rs(h) ? m[b]() : m.thru(h)
                    }
                    return function() {
                        var M = arguments
                          , z = M[0];
                        if (m && M.length == 1 && pe(z))
                            return m.plant(z).value();
                        for (var R = 0, X = a ? t[R].apply(this, M) : z; ++R < a; )
                            X = t[R].call(this, X);
                        return X
                    }
                })
            }
            function ua(e, t, a, u, d, h, m, b, x, M) {
                var z = t & T
                  , R = t & S
                  , X = t & Z
                  , re = t & (j | H)
                  , se = t & Q
                  , ye = X ? r : ei(e);
                function ue() {
                    for (var xe = arguments.length, Oe = $(xe), bt = xe; bt--; )
                        Oe[bt] = arguments[bt];
                    if (re)
                        var ot = wr(ue)
                          , _t = np(Oe, ot);
                    if (u && (Oe = kl(Oe, u, d, re)),
                    h && (Oe = Sl(Oe, h, m, re)),
                    xe -= _t,
                    re && xe < M) {
                        var Ve = kn(Oe, ot);
                        return Pl(e, t, ua, ue.placeholder, a, Oe, Ve, b, x, M - xe)
                    }
                    var Dt = R ? a : this
                      , dn = X ? Dt[e] : e;
                    return xe = Oe.length,
                    b ? Oe = cv(Oe, b) : se && xe > 1 && Oe.reverse(),
                    z && x < xe && (Oe.length = x),
                    this && this !== Je && this instanceof ue && (dn = ye || ei(dn)),
                    dn.apply(Dt, Oe)
                }
                return ue
            }
            function Al(e, t) {
                return function(a, u) {
                    return yh(a, e, t(u), {})
                }
            }
            function la(e, t) {
                return function(a, u) {
                    var d;
                    if (a === r && u === r)
                        return t;
                    if (a !== r && (d = a),
                    u !== r) {
                        if (d === r)
                            return u;
                        typeof a == "string" || typeof u == "string" ? (a = mt(a),
                        u = mt(u)) : (a = vl(a),
                        u = vl(u)),
                        d = e(a, u)
                    }
                    return d
                }
            }
            function Yo(e) {
                return sn(function(t) {
                    return t = Le(t, gt(oe())),
                    _e(function(a) {
                        var u = this;
                        return e(t, function(d) {
                            return vt(d, u, a)
                        })
                    })
                })
            }
            function ca(e, t) {
                t = t === r ? " " : mt(t);
                var a = t.length;
                if (a < 2)
                    return a ? Fo(t, e) : t;
                var u = Fo(t, Xi(e / hr(t)));
                return pr(t) ? jn(Bt(u), 0, e).join("") : u.slice(0, e)
            }
            function Uh(e, t, a, u) {
                var d = t & S
                  , h = ei(e);
                function m() {
                    for (var b = -1, x = arguments.length, M = -1, z = u.length, R = $(z + x), X = this && this !== Je && this instanceof m ? h : e; ++M < z; )
                        R[M] = u[M];
                    for (; x--; )
                        R[M++] = arguments[++b];
                    return vt(X, d ? a : this, R)
                }
                return m
            }
            function Cl(e) {
                return function(t, a, u) {
                    return u && typeof u != "number" && at(t, a, u) && (a = u = r),
                    t = cn(t),
                    a === r ? (a = t,
                    t = 0) : a = cn(a),
                    u = u === r ? t < a ? 1 : -1 : cn(u),
                    Ah(t, a, u, e)
                }
            }
            function da(e) {
                return function(t, a) {
                    return typeof t == "string" && typeof a == "string" || (t = At(t),
                    a = At(a)),
                    e(t, a)
                }
            }
            function Pl(e, t, a, u, d, h, m, b, x, M) {
                var z = t & j
                  , R = z ? m : r
                  , X = z ? r : m
                  , re = z ? h : r
                  , se = z ? r : h;
                t |= z ? W : V,
                t &= ~(z ? V : W),
                t & I || (t &= ~(S | Z));
                var ye = [e, t, d, re, R, se, X, b, x, M]
                  , ue = a.apply(r, ye);
                return rs(e) && Vl(ue, ye),
                ue.placeholder = u,
                Ul(ue, e, t)
            }
            function Xo(e) {
                var t = He[e];
                return function(a, u) {
                    if (a = At(a),
                    u = u == null ? 0 : et(ge(u), 292),
                    u && Uu(a)) {
                        var d = (Ae(a) + "e").split("e")
                          , h = t(d[0] + "e" + (+d[1] + u));
                        return d = (Ae(h) + "e").split("e"),
                        +(d[0] + "e" + (+d[1] - u))
                    }
                    return t(a)
                }
            }
            var qh = mr && 1 / Zi(new mr([, -0]))[1] == B ? function(e) {
                return new mr(e)
            }
            : ys;
            function Ml(e) {
                return function(t) {
                    var a = tt(t);
                    return a == Nt ? $o(t) : a == zt ? lp(t) : tp(t, e(t))
                }
            }
            function on(e, t, a, u, d, h, m, b) {
                var x = t & Z;
                if (!x && typeof e != "function")
                    throw new Ot(c);
                var M = u ? u.length : 0;
                if (M || (t &= ~(W | V),
                u = d = r),
                m = m === r ? m : Ke(ge(m), 0),
                b = b === r ? b : ge(b),
                M -= d ? d.length : 0,
                t & V) {
                    var z = u
                      , R = d;
                    u = d = r
                }
                var X = x ? r : Go(e)
                  , re = [e, t, a, u, d, z, R, h, m, b];
                if (X && sv(re, X),
                e = re[0],
                t = re[1],
                a = re[2],
                u = re[3],
                d = re[4],
                b = re[9] = re[9] === r ? x ? 0 : e.length : Ke(re[9] - M, 0),
                !b && t & (j | H) && (t &= ~(j | H)),
                !t || t == S)
                    var se = Wh(e, t, a);
                else
                    t == j || t == H ? se = Vh(e, t, b) : (t == W || t == (S | W)) && !d.length ? se = Uh(e, t, a, u) : se = ua.apply(r, re);
                var ye = X ? pl : Vl;
                return Ul(ye(se, re), e, t)
            }
            function Nl(e, t, a, u) {
                return e === r || It(e, gr[a]) && !Pe.call(u, a) ? t : e
            }
            function zl(e, t, a, u, d, h) {
                return Ie(e) && Ie(t) && (h.set(t, e),
                ia(e, t, r, zl, h),
                h.delete(t)),
                e
            }
            function Hh(e) {
                return ri(e) ? r : e
            }
            function Bl(e, t, a, u, d, h) {
                var m = a & w
                  , b = e.length
                  , x = t.length;
                if (b != x && !(m && x > b))
                    return !1;
                var M = h.get(e)
                  , z = h.get(t);
                if (M && z)
                    return M == t && z == e;
                var R = -1
                  , X = !0
                  , re = a & P ? new Hn : r;
                for (h.set(e, t),
                h.set(t, e); ++R < b; ) {
                    var se = e[R]
                      , ye = t[R];
                    if (u)
                        var ue = m ? u(ye, se, R, t, e, h) : u(se, ye, R, e, t, h);
                    if (ue !== r) {
                        if (ue)
                            continue;
                        X = !1;
                        break
                    }
                    if (re) {
                        if (!_o(t, function(xe, Oe) {
                            if (!Wr(re, Oe) && (se === xe || d(se, xe, a, u, h)))
                                return re.push(Oe)
                        })) {
                            X = !1;
                            break
                        }
                    } else if (!(se === ye || d(se, ye, a, u, h))) {
                        X = !1;
                        break
                    }
                }
                return h.delete(e),
                h.delete(t),
                X
            }
            function Kh(e, t, a, u, d, h, m) {
                switch (a) {
                case cr:
                    if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                        return !1;
                    e = e.buffer,
                    t = t.buffer;
                case Fr:
                    return !(e.byteLength != t.byteLength || !h(new qi(e), new qi(t)));
                case ht:
                case Ue:
                case Ir:
                    return It(+e, +t);
                case qt:
                    return e.name == t.name && e.message == t.message;
                case Dr:
                case Zr:
                    return e == t + "";
                case Nt:
                    var b = $o;
                case zt:
                    var x = u & w;
                    if (b || (b = Zi),
                    e.size != t.size && !x)
                        return !1;
                    var M = m.get(e);
                    if (M)
                        return M == t;
                    u |= P,
                    m.set(e, t);
                    var z = Bl(b(e), b(t), u, d, h, m);
                    return m.delete(e),
                    z;
                case Ni:
                    if (Kr)
                        return Kr.call(e) == Kr.call(t)
                }
                return !1
            }
            function Yh(e, t, a, u, d, h) {
                var m = a & w
                  , b = Jo(e)
                  , x = b.length
                  , M = Jo(t)
                  , z = M.length;
                if (x != z && !m)
                    return !1;
                for (var R = x; R--; ) {
                    var X = b[R];
                    if (!(m ? X in t : Pe.call(t, X)))
                        return !1
                }
                var re = h.get(e)
                  , se = h.get(t);
                if (re && se)
                    return re == t && se == e;
                var ye = !0;
                h.set(e, t),
                h.set(t, e);
                for (var ue = m; ++R < x; ) {
                    X = b[R];
                    var xe = e[X]
                      , Oe = t[X];
                    if (u)
                        var bt = m ? u(Oe, xe, X, t, e, h) : u(xe, Oe, X, e, t, h);
                    if (!(bt === r ? xe === Oe || d(xe, Oe, a, u, h) : bt)) {
                        ye = !1;
                        break
                    }
                    ue || (ue = X == "constructor")
                }
                if (ye && !ue) {
                    var ot = e.constructor
                      , _t = t.constructor;
                    ot != _t && "constructor"in e && "constructor"in t && !(typeof ot == "function" && ot instanceof ot && typeof _t == "function" && _t instanceof _t) && (ye = !1)
                }
                return h.delete(e),
                h.delete(t),
                ye
            }
            function sn(e) {
                return as(Fl(e, r, Jl), e + "")
            }
            function Jo(e) {
                return nl(e, Ye, ts)
            }
            function Qo(e) {
                return nl(e, ft, Ll)
            }
            var Go = Qi ? function(e) {
                return Qi.get(e)
            }
            : ys;
            function fa(e) {
                for (var t = e.name + "", a = yr[t], u = Pe.call(yr, t) ? a.length : 0; u--; ) {
                    var d = a[u]
                      , h = d.func;
                    if (h == null || h == e)
                        return d.name
                }
                return t
            }
            function wr(e) {
                var t = Pe.call(p, "placeholder") ? p : e;
                return t.placeholder
            }
            function oe() {
                var e = p.iteratee || gs;
                return e = e === gs ? al : e,
                arguments.length ? e(arguments[0], arguments[1]) : e
            }
            function pa(e, t) {
                var a = e.__data__;
                return rv(t) ? a[typeof t == "string" ? "string" : "hash"] : a.map
            }
            function es(e) {
                for (var t = Ye(e), a = t.length; a--; ) {
                    var u = t[a]
                      , d = e[u];
                    t[a] = [u, d, Zl(d)]
                }
                return t
            }
            function Xn(e, t) {
                var a = op(e, t);
                return il(a) ? a : r
            }
            function Xh(e) {
                var t = Pe.call(e, Un)
                  , a = e[Un];
                try {
                    e[Un] = r;
                    var u = !0
                } catch {}
                var d = Vi.call(e);
                return u && (t ? e[Un] = a : delete e[Un]),
                d
            }
            var ts = jo ? function(e) {
                return e == null ? [] : (e = Me(e),
                xn(jo(e), function(t) {
                    return Wu.call(e, t)
                }))
            }
            : bs
              , Ll = jo ? function(e) {
                for (var t = []; e; )
                    wn(t, ts(e)),
                    e = Hi(e);
                return t
            }
            : bs
              , tt = it;
            (Eo && tt(new Eo(new ArrayBuffer(1))) != cr || Ur && tt(new Ur) != Nt || Ao && tt(Ao.resolve()) != Gs || mr && tt(new mr) != zt || qr && tt(new qr) != Rr) && (tt = function(e) {
                var t = it(e)
                  , a = t == tn ? e.constructor : r
                  , u = a ? Jn(a) : "";
                if (u)
                    switch (u) {
                    case Pp:
                        return cr;
                    case Mp:
                        return Nt;
                    case Np:
                        return Gs;
                    case zp:
                        return zt;
                    case Bp:
                        return Rr
                    }
                return t
            }
            );
            function Jh(e, t, a) {
                for (var u = -1, d = a.length; ++u < d; ) {
                    var h = a[u]
                      , m = h.size;
                    switch (h.type) {
                    case "drop":
                        e += m;
                        break;
                    case "dropRight":
                        t -= m;
                        break;
                    case "take":
                        t = et(t, e + m);
                        break;
                    case "takeRight":
                        e = Ke(e, t - m);
                        break
                    }
                }
                return {
                    start: e,
                    end: t
                }
            }
            function Qh(e) {
                var t = e.match(rf);
                return t ? t[1].split(af) : []
            }
            function Il(e, t, a) {
                t = Tn(t, e);
                for (var u = -1, d = t.length, h = !1; ++u < d; ) {
                    var m = Yt(t[u]);
                    if (!(h = e != null && a(e, m)))
                        break;
                    e = e[m]
                }
                return h || ++u != d ? h : (d = e == null ? 0 : e.length,
                !!d && _a(d) && un(m, d) && (pe(e) || Qn(e)))
            }
            function Gh(e) {
                var t = e.length
                  , a = new e.constructor(t);
                return t && typeof e[0] == "string" && Pe.call(e, "index") && (a.index = e.index,
                a.input = e.input),
                a
            }
            function Dl(e) {
                return typeof e.constructor == "function" && !ti(e) ? br(Hi(e)) : {}
            }
            function ev(e, t, a) {
                var u = e.constructor;
                switch (t) {
                case Fr:
                    return Ko(e);
                case ht:
                case Ue:
                    return new u(+e);
                case cr:
                    return Lh(e, a);
                case Ga:
                case eo:
                case to:
                case no:
                case ro:
                case io:
                case ao:
                case oo:
                case so:
                    return xl(e, a);
                case Nt:
                    return new u;
                case Ir:
                case Zr:
                    return new u(e);
                case Dr:
                    return Ih(e);
                case zt:
                    return new u;
                case Ni:
                    return Dh(e)
                }
            }
            function tv(e, t) {
                var a = t.length;
                if (!a)
                    return e;
                var u = a - 1;
                return t[u] = (a > 1 ? "& " : "") + t[u],
                t = t.join(a > 2 ? ", " : " "),
                e.replace(nf, `{
/* [wrapped with ` + t + `] */
`)
            }
            function nv(e) {
                return pe(e) || Qn(e) || !!(Vu && e && e[Vu])
            }
            function un(e, t) {
                var a = typeof e;
                return t = t ?? K,
                !!t && (a == "number" || a != "symbol" && hf.test(e)) && e > -1 && e % 1 == 0 && e < t
            }
            function at(e, t, a) {
                if (!Ie(a))
                    return !1;
                var u = typeof t;
                return (u == "number" ? dt(a) && un(t, a.length) : u == "string" && t in a) ? It(a[t], e) : !1
            }
            function ns(e, t) {
                if (pe(e))
                    return !1;
                var a = typeof e;
                return a == "number" || a == "symbol" || a == "boolean" || e == null || yt(e) ? !0 : Qd.test(e) || !Jd.test(e) || t != null && e in Me(t)
            }
            function rv(e) {
                var t = typeof e;
                return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
            }
            function rs(e) {
                var t = fa(e)
                  , a = p[t];
                if (typeof a != "function" || !(t in we.prototype))
                    return !1;
                if (e === a)
                    return !0;
                var u = Go(a);
                return !!u && e === u[0]
            }
            function iv(e) {
                return !!Zu && Zu in e
            }
            var av = Fi ? ln : _s;
            function ti(e) {
                var t = e && e.constructor
                  , a = typeof t == "function" && t.prototype || gr;
                return e === a
            }
            function Zl(e) {
                return e === e && !Ie(e)
            }
            function Rl(e, t) {
                return function(a) {
                    return a == null ? !1 : a[e] === t && (t !== r || e in Me(a))
                }
            }
            function ov(e) {
                var t = ya(e, function(u) {
                    return a.size === g && a.clear(),
                    u
                })
                  , a = t.cache;
                return t
            }
            function sv(e, t) {
                var a = e[1]
                  , u = t[1]
                  , d = a | u
                  , h = d < (S | Z | T)
                  , m = u == T && a == j || u == T && a == L && e[7].length <= t[8] || u == (T | L) && t[7].length <= t[8] && a == j;
                if (!(h || m))
                    return e;
                u & S && (e[2] = t[2],
                d |= a & S ? 0 : I);
                var b = t[3];
                if (b) {
                    var x = e[3];
                    e[3] = x ? kl(x, b, t[4]) : b,
                    e[4] = x ? kn(e[3], y) : t[4]
                }
                return b = t[5],
                b && (x = e[5],
                e[5] = x ? Sl(x, b, t[6]) : b,
                e[6] = x ? kn(e[5], y) : t[6]),
                b = t[7],
                b && (e[7] = b),
                u & T && (e[8] = e[8] == null ? t[8] : et(e[8], t[8])),
                e[9] == null && (e[9] = t[9]),
                e[0] = t[0],
                e[1] = d,
                e
            }
            function uv(e) {
                var t = [];
                if (e != null)
                    for (var a in Me(e))
                        t.push(a);
                return t
            }
            function lv(e) {
                return Vi.call(e)
            }
            function Fl(e, t, a) {
                return t = Ke(t === r ? e.length - 1 : t, 0),
                function() {
                    for (var u = arguments, d = -1, h = Ke(u.length - t, 0), m = $(h); ++d < h; )
                        m[d] = u[t + d];
                    d = -1;
                    for (var b = $(t + 1); ++d < t; )
                        b[d] = u[d];
                    return b[t] = a(m),
                    vt(e, this, b)
                }
            }
            function Wl(e, t) {
                return t.length < 2 ? e : Yn(e, jt(t, 0, -1))
            }
            function cv(e, t) {
                for (var a = e.length, u = et(t.length, a), d = ct(e); u--; ) {
                    var h = t[u];
                    e[u] = un(h, a) ? d[h] : r
                }
                return e
            }
            function is(e, t) {
                if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
                    return e[t]
            }
            var Vl = ql(pl)
              , ni = Op || function(e, t) {
                return Je.setTimeout(e, t)
            }
              , as = ql(Mh);
            function Ul(e, t, a) {
                var u = t + "";
                return as(e, tv(u, dv(Qh(u), a)))
            }
            function ql(e) {
                var t = 0
                  , a = 0;
                return function() {
                    var u = Ep()
                      , d = D - (u - a);
                    if (a = u,
                    d > 0) {
                        if (++t >= U)
                            return arguments[0]
                    } else
                        t = 0;
                    return e.apply(r, arguments)
                }
            }
            function ha(e, t) {
                var a = -1
                  , u = e.length
                  , d = u - 1;
                for (t = t === r ? u : t; ++a < t; ) {
                    var h = Ro(a, d)
                      , m = e[h];
                    e[h] = e[a],
                    e[a] = m
                }
                return e.length = t,
                e
            }
            var Hl = ov(function(e) {
                var t = [];
                return e.charCodeAt(0) === 46 && t.push(""),
                e.replace(Gd, function(a, u, d, h) {
                    t.push(d ? h.replace(uf, "$1") : u || a)
                }),
                t
            });
            function Yt(e) {
                if (typeof e == "string" || yt(e))
                    return e;
                var t = e + "";
                return t == "0" && 1 / e == -B ? "-0" : t
            }
            function Jn(e) {
                if (e != null) {
                    try {
                        return Wi.call(e)
                    } catch {}
                    try {
                        return e + ""
                    } catch {}
                }
                return ""
            }
            function dv(e, t) {
                return St(Xe, function(a) {
                    var u = "_." + a[0];
                    t & a[1] && !Ii(e, u) && e.push(u)
                }),
                e.sort()
            }
            function Kl(e) {
                if (e instanceof we)
                    return e.clone();
                var t = new $t(e.__wrapped__,e.__chain__);
                return t.__actions__ = ct(e.__actions__),
                t.__index__ = e.__index__,
                t.__values__ = e.__values__,
                t
            }
            function fv(e, t, a) {
                (a ? at(e, t, a) : t === r) ? t = 1 : t = Ke(ge(t), 0);
                var u = e == null ? 0 : e.length;
                if (!u || t < 1)
                    return [];
                for (var d = 0, h = 0, m = $(Xi(u / t)); d < u; )
                    m[h++] = jt(e, d, d += t);
                return m
            }
            function pv(e) {
                for (var t = -1, a = e == null ? 0 : e.length, u = 0, d = []; ++t < a; ) {
                    var h = e[t];
                    h && (d[u++] = h)
                }
                return d
            }
            function hv() {
                var e = arguments.length;
                if (!e)
                    return [];
                for (var t = $(e - 1), a = arguments[0], u = e; u--; )
                    t[u - 1] = arguments[u];
                return wn(pe(a) ? ct(a) : [a], Qe(t, 1))
            }
            var vv = _e(function(e, t) {
                return We(e) ? Xr(e, Qe(t, 1, We, !0)) : []
            })
              , gv = _e(function(e, t) {
                var a = Et(t);
                return We(a) && (a = r),
                We(e) ? Xr(e, Qe(t, 1, We, !0), oe(a, 2)) : []
            })
              , mv = _e(function(e, t) {
                var a = Et(t);
                return We(a) && (a = r),
                We(e) ? Xr(e, Qe(t, 1, We, !0), r, a) : []
            });
            function yv(e, t, a) {
                var u = e == null ? 0 : e.length;
                return u ? (t = a || t === r ? 1 : ge(t),
                jt(e, t < 0 ? 0 : t, u)) : []
            }
            function bv(e, t, a) {
                var u = e == null ? 0 : e.length;
                return u ? (t = a || t === r ? 1 : ge(t),
                t = u - t,
                jt(e, 0, t < 0 ? 0 : t)) : []
            }
            function _v(e, t) {
                return e && e.length ? oa(e, oe(t, 3), !0, !0) : []
            }
            function xv(e, t) {
                return e && e.length ? oa(e, oe(t, 3), !0) : []
            }
            function wv(e, t, a, u) {
                var d = e == null ? 0 : e.length;
                return d ? (a && typeof a != "number" && at(e, t, a) && (a = 0,
                u = d),
                hh(e, t, a, u)) : []
            }
            function Yl(e, t, a) {
                var u = e == null ? 0 : e.length;
                if (!u)
                    return -1;
                var d = a == null ? 0 : ge(a);
                return d < 0 && (d = Ke(u + d, 0)),
                Di(e, oe(t, 3), d)
            }
            function Xl(e, t, a) {
                var u = e == null ? 0 : e.length;
                if (!u)
                    return -1;
                var d = u - 1;
                return a !== r && (d = ge(a),
                d = a < 0 ? Ke(u + d, 0) : et(d, u - 1)),
                Di(e, oe(t, 3), d, !0)
            }
            function Jl(e) {
                var t = e == null ? 0 : e.length;
                return t ? Qe(e, 1) : []
            }
            function kv(e) {
                var t = e == null ? 0 : e.length;
                return t ? Qe(e, B) : []
            }
            function Sv(e, t) {
                var a = e == null ? 0 : e.length;
                return a ? (t = t === r ? 1 : ge(t),
                Qe(e, t)) : []
            }
            function Ov(e) {
                for (var t = -1, a = e == null ? 0 : e.length, u = {}; ++t < a; ) {
                    var d = e[t];
                    u[d[0]] = d[1]
                }
                return u
            }
            function Ql(e) {
                return e && e.length ? e[0] : r
            }
            function $v(e, t, a) {
                var u = e == null ? 0 : e.length;
                if (!u)
                    return -1;
                var d = a == null ? 0 : ge(a);
                return d < 0 && (d = Ke(u + d, 0)),
                fr(e, t, d)
            }
            function Tv(e) {
                var t = e == null ? 0 : e.length;
                return t ? jt(e, 0, -1) : []
            }
            var jv = _e(function(e) {
                var t = Le(e, qo);
                return t.length && t[0] === e[0] ? Bo(t) : []
            })
              , Ev = _e(function(e) {
                var t = Et(e)
                  , a = Le(e, qo);
                return t === Et(a) ? t = r : a.pop(),
                a.length && a[0] === e[0] ? Bo(a, oe(t, 2)) : []
            })
              , Av = _e(function(e) {
                var t = Et(e)
                  , a = Le(e, qo);
                return t = typeof t == "function" ? t : r,
                t && a.pop(),
                a.length && a[0] === e[0] ? Bo(a, r, t) : []
            });
            function Cv(e, t) {
                return e == null ? "" : Tp.call(e, t)
            }
            function Et(e) {
                var t = e == null ? 0 : e.length;
                return t ? e[t - 1] : r
            }
            function Pv(e, t, a) {
                var u = e == null ? 0 : e.length;
                if (!u)
                    return -1;
                var d = u;
                return a !== r && (d = ge(a),
                d = d < 0 ? Ke(u + d, 0) : et(d, u - 1)),
                t === t ? dp(e, t, d) : Di(e, Pu, d, !0)
            }
            function Mv(e, t) {
                return e && e.length ? ll(e, ge(t)) : r
            }
            var Nv = _e(Gl);
            function Gl(e, t) {
                return e && e.length && t && t.length ? Zo(e, t) : e
            }
            function zv(e, t, a) {
                return e && e.length && t && t.length ? Zo(e, t, oe(a, 2)) : e
            }
            function Bv(e, t, a) {
                return e && e.length && t && t.length ? Zo(e, t, r, a) : e
            }
            var Lv = sn(function(e, t) {
                var a = e == null ? 0 : e.length
                  , u = Po(e, t);
                return fl(e, Le(t, function(d) {
                    return un(d, a) ? +d : d
                }).sort(wl)),
                u
            });
            function Iv(e, t) {
                var a = [];
                if (!(e && e.length))
                    return a;
                var u = -1
                  , d = []
                  , h = e.length;
                for (t = oe(t, 3); ++u < h; ) {
                    var m = e[u];
                    t(m, u, e) && (a.push(m),
                    d.push(u))
                }
                return fl(e, d),
                a
            }
            function os(e) {
                return e == null ? e : Cp.call(e)
            }
            function Dv(e, t, a) {
                var u = e == null ? 0 : e.length;
                return u ? (a && typeof a != "number" && at(e, t, a) ? (t = 0,
                a = u) : (t = t == null ? 0 : ge(t),
                a = a === r ? u : ge(a)),
                jt(e, t, a)) : []
            }
            function Zv(e, t) {
                return aa(e, t)
            }
            function Rv(e, t, a) {
                return Wo(e, t, oe(a, 2))
            }
            function Fv(e, t) {
                var a = e == null ? 0 : e.length;
                if (a) {
                    var u = aa(e, t);
                    if (u < a && It(e[u], t))
                        return u
                }
                return -1
            }
            function Wv(e, t) {
                return aa(e, t, !0)
            }
            function Vv(e, t, a) {
                return Wo(e, t, oe(a, 2), !0)
            }
            function Uv(e, t) {
                var a = e == null ? 0 : e.length;
                if (a) {
                    var u = aa(e, t, !0) - 1;
                    if (It(e[u], t))
                        return u
                }
                return -1
            }
            function qv(e) {
                return e && e.length ? hl(e) : []
            }
            function Hv(e, t) {
                return e && e.length ? hl(e, oe(t, 2)) : []
            }
            function Kv(e) {
                var t = e == null ? 0 : e.length;
                return t ? jt(e, 1, t) : []
            }
            function Yv(e, t, a) {
                return e && e.length ? (t = a || t === r ? 1 : ge(t),
                jt(e, 0, t < 0 ? 0 : t)) : []
            }
            function Xv(e, t, a) {
                var u = e == null ? 0 : e.length;
                return u ? (t = a || t === r ? 1 : ge(t),
                t = u - t,
                jt(e, t < 0 ? 0 : t, u)) : []
            }
            function Jv(e, t) {
                return e && e.length ? oa(e, oe(t, 3), !1, !0) : []
            }
            function Qv(e, t) {
                return e && e.length ? oa(e, oe(t, 3)) : []
            }
            var Gv = _e(function(e) {
                return $n(Qe(e, 1, We, !0))
            })
              , eg = _e(function(e) {
                var t = Et(e);
                return We(t) && (t = r),
                $n(Qe(e, 1, We, !0), oe(t, 2))
            })
              , tg = _e(function(e) {
                var t = Et(e);
                return t = typeof t == "function" ? t : r,
                $n(Qe(e, 1, We, !0), r, t)
            });
            function ng(e) {
                return e && e.length ? $n(e) : []
            }
            function rg(e, t) {
                return e && e.length ? $n(e, oe(t, 2)) : []
            }
            function ig(e, t) {
                return t = typeof t == "function" ? t : r,
                e && e.length ? $n(e, r, t) : []
            }
            function ss(e) {
                if (!(e && e.length))
                    return [];
                var t = 0;
                return e = xn(e, function(a) {
                    if (We(a))
                        return t = Ke(a.length, t),
                        !0
                }),
                So(t, function(a) {
                    return Le(e, xo(a))
                })
            }
            function ec(e, t) {
                if (!(e && e.length))
                    return [];
                var a = ss(e);
                return t == null ? a : Le(a, function(u) {
                    return vt(t, r, u)
                })
            }
            var ag = _e(function(e, t) {
                return We(e) ? Xr(e, t) : []
            })
              , og = _e(function(e) {
                return Uo(xn(e, We))
            })
              , sg = _e(function(e) {
                var t = Et(e);
                return We(t) && (t = r),
                Uo(xn(e, We), oe(t, 2))
            })
              , ug = _e(function(e) {
                var t = Et(e);
                return t = typeof t == "function" ? t : r,
                Uo(xn(e, We), r, t)
            })
              , lg = _e(ss);
            function cg(e, t) {
                return yl(e || [], t || [], Yr)
            }
            function dg(e, t) {
                return yl(e || [], t || [], Gr)
            }
            var fg = _e(function(e) {
                var t = e.length
                  , a = t > 1 ? e[t - 1] : r;
                return a = typeof a == "function" ? (e.pop(),
                a) : r,
                ec(e, a)
            });
            function tc(e) {
                var t = p(e);
                return t.__chain__ = !0,
                t
            }
            function pg(e, t) {
                return t(e),
                e
            }
            function va(e, t) {
                return t(e)
            }
            var hg = sn(function(e) {
                var t = e.length
                  , a = t ? e[0] : 0
                  , u = this.__wrapped__
                  , d = function(h) {
                    return Po(h, e)
                };
                return t > 1 || this.__actions__.length || !(u instanceof we) || !un(a) ? this.thru(d) : (u = u.slice(a, +a + (t ? 1 : 0)),
                u.__actions__.push({
                    func: va,
                    args: [d],
                    thisArg: r
                }),
                new $t(u,this.__chain__).thru(function(h) {
                    return t && !h.length && h.push(r),
                    h
                }))
            });
            function vg() {
                return tc(this)
            }
            function gg() {
                return new $t(this.value(),this.__chain__)
            }
            function mg() {
                this.__values__ === r && (this.__values__ = vc(this.value()));
                var e = this.__index__ >= this.__values__.length
                  , t = e ? r : this.__values__[this.__index__++];
                return {
                    done: e,
                    value: t
                }
            }
            function yg() {
                return this
            }
            function bg(e) {
                for (var t, a = this; a instanceof ea; ) {
                    var u = Kl(a);
                    u.__index__ = 0,
                    u.__values__ = r,
                    t ? d.__wrapped__ = u : t = u;
                    var d = u;
                    a = a.__wrapped__
                }
                return d.__wrapped__ = e,
                t
            }
            function _g() {
                var e = this.__wrapped__;
                if (e instanceof we) {
                    var t = e;
                    return this.__actions__.length && (t = new we(this)),
                    t = t.reverse(),
                    t.__actions__.push({
                        func: va,
                        args: [os],
                        thisArg: r
                    }),
                    new $t(t,this.__chain__)
                }
                return this.thru(os)
            }
            function xg() {
                return ml(this.__wrapped__, this.__actions__)
            }
            var wg = sa(function(e, t, a) {
                Pe.call(e, a) ? ++e[a] : an(e, a, 1)
            });
            function kg(e, t, a) {
                var u = pe(e) ? Au : ph;
                return a && at(e, t, a) && (t = r),
                u(e, oe(t, 3))
            }
            function Sg(e, t) {
                var a = pe(e) ? xn : el;
                return a(e, oe(t, 3))
            }
            var Og = jl(Yl)
              , $g = jl(Xl);
            function Tg(e, t) {
                return Qe(ga(e, t), 1)
            }
            function jg(e, t) {
                return Qe(ga(e, t), B)
            }
            function Eg(e, t, a) {
                return a = a === r ? 1 : ge(a),
                Qe(ga(e, t), a)
            }
            function nc(e, t) {
                var a = pe(e) ? St : On;
                return a(e, oe(t, 3))
            }
            function rc(e, t) {
                var a = pe(e) ? Kf : Gu;
                return a(e, oe(t, 3))
            }
            var Ag = sa(function(e, t, a) {
                Pe.call(e, a) ? e[a].push(t) : an(e, a, [t])
            });
            function Cg(e, t, a, u) {
                e = dt(e) ? e : Sr(e),
                a = a && !u ? ge(a) : 0;
                var d = e.length;
                return a < 0 && (a = Ke(d + a, 0)),
                xa(e) ? a <= d && e.indexOf(t, a) > -1 : !!d && fr(e, t, a) > -1
            }
            var Pg = _e(function(e, t, a) {
                var u = -1
                  , d = typeof t == "function"
                  , h = dt(e) ? $(e.length) : [];
                return On(e, function(m) {
                    h[++u] = d ? vt(t, m, a) : Jr(m, t, a)
                }),
                h
            })
              , Mg = sa(function(e, t, a) {
                an(e, a, t)
            });
            function ga(e, t) {
                var a = pe(e) ? Le : ol;
                return a(e, oe(t, 3))
            }
            function Ng(e, t, a, u) {
                return e == null ? [] : (pe(t) || (t = t == null ? [] : [t]),
                a = u ? r : a,
                pe(a) || (a = a == null ? [] : [a]),
                cl(e, t, a))
            }
            var zg = sa(function(e, t, a) {
                e[a ? 0 : 1].push(t)
            }, function() {
                return [[], []]
            });
            function Bg(e, t, a) {
                var u = pe(e) ? bo : Nu
                  , d = arguments.length < 3;
                return u(e, oe(t, 4), a, d, On)
            }
            function Lg(e, t, a) {
                var u = pe(e) ? Yf : Nu
                  , d = arguments.length < 3;
                return u(e, oe(t, 4), a, d, Gu)
            }
            function Ig(e, t) {
                var a = pe(e) ? xn : el;
                return a(e, ba(oe(t, 3)))
            }
            function Dg(e) {
                var t = pe(e) ? Yu : Ch;
                return t(e)
            }
            function Zg(e, t, a) {
                (a ? at(e, t, a) : t === r) ? t = 1 : t = ge(t);
                var u = pe(e) ? uh : Ph;
                return u(e, t)
            }
            function Rg(e) {
                var t = pe(e) ? lh : Nh;
                return t(e)
            }
            function Fg(e) {
                if (e == null)
                    return 0;
                if (dt(e))
                    return xa(e) ? hr(e) : e.length;
                var t = tt(e);
                return t == Nt || t == zt ? e.size : Io(e).length
            }
            function Wg(e, t, a) {
                var u = pe(e) ? _o : zh;
                return a && at(e, t, a) && (t = r),
                u(e, oe(t, 3))
            }
            var Vg = _e(function(e, t) {
                if (e == null)
                    return [];
                var a = t.length;
                return a > 1 && at(e, t[0], t[1]) ? t = [] : a > 2 && at(t[0], t[1], t[2]) && (t = [t[0]]),
                cl(e, Qe(t, 1), [])
            })
              , ma = Sp || function() {
                return Je.Date.now()
            }
            ;
            function Ug(e, t) {
                if (typeof t != "function")
                    throw new Ot(c);
                return e = ge(e),
                function() {
                    if (--e < 1)
                        return t.apply(this, arguments)
                }
            }
            function ic(e, t, a) {
                return t = a ? r : t,
                t = e && t == null ? e.length : t,
                on(e, T, r, r, r, r, t)
            }
            function ac(e, t) {
                var a;
                if (typeof t != "function")
                    throw new Ot(c);
                return e = ge(e),
                function() {
                    return --e > 0 && (a = t.apply(this, arguments)),
                    e <= 1 && (t = r),
                    a
                }
            }
            var us = _e(function(e, t, a) {
                var u = S;
                if (a.length) {
                    var d = kn(a, wr(us));
                    u |= W
                }
                return on(e, u, t, a, d)
            })
              , oc = _e(function(e, t, a) {
                var u = S | Z;
                if (a.length) {
                    var d = kn(a, wr(oc));
                    u |= W
                }
                return on(t, u, e, a, d)
            });
            function sc(e, t, a) {
                t = a ? r : t;
                var u = on(e, j, r, r, r, r, r, t);
                return u.placeholder = sc.placeholder,
                u
            }
            function uc(e, t, a) {
                t = a ? r : t;
                var u = on(e, H, r, r, r, r, r, t);
                return u.placeholder = uc.placeholder,
                u
            }
            function lc(e, t, a) {
                var u, d, h, m, b, x, M = 0, z = !1, R = !1, X = !0;
                if (typeof e != "function")
                    throw new Ot(c);
                t = At(t) || 0,
                Ie(a) && (z = !!a.leading,
                R = "maxWait"in a,
                h = R ? Ke(At(a.maxWait) || 0, t) : h,
                X = "trailing"in a ? !!a.trailing : X);
                function re(Ve) {
                    var Dt = u
                      , dn = d;
                    return u = d = r,
                    M = Ve,
                    m = e.apply(dn, Dt),
                    m
                }
                function se(Ve) {
                    return M = Ve,
                    b = ni(xe, t),
                    z ? re(Ve) : m
                }
                function ye(Ve) {
                    var Dt = Ve - x
                      , dn = Ve - M
                      , jc = t - Dt;
                    return R ? et(jc, h - dn) : jc
                }
                function ue(Ve) {
                    var Dt = Ve - x
                      , dn = Ve - M;
                    return x === r || Dt >= t || Dt < 0 || R && dn >= h
                }
                function xe() {
                    var Ve = ma();
                    if (ue(Ve))
                        return Oe(Ve);
                    b = ni(xe, ye(Ve))
                }
                function Oe(Ve) {
                    return b = r,
                    X && u ? re(Ve) : (u = d = r,
                    m)
                }
                function bt() {
                    b !== r && bl(b),
                    M = 0,
                    u = x = d = b = r
                }
                function ot() {
                    return b === r ? m : Oe(ma())
                }
                function _t() {
                    var Ve = ma()
                      , Dt = ue(Ve);
                    if (u = arguments,
                    d = this,
                    x = Ve,
                    Dt) {
                        if (b === r)
                            return se(x);
                        if (R)
                            return bl(b),
                            b = ni(xe, t),
                            re(x)
                    }
                    return b === r && (b = ni(xe, t)),
                    m
                }
                return _t.cancel = bt,
                _t.flush = ot,
                _t
            }
            var qg = _e(function(e, t) {
                return Qu(e, 1, t)
            })
              , Hg = _e(function(e, t, a) {
                return Qu(e, At(t) || 0, a)
            });
            function Kg(e) {
                return on(e, Q)
            }
            function ya(e, t) {
                if (typeof e != "function" || t != null && typeof t != "function")
                    throw new Ot(c);
                var a = function() {
                    var u = arguments
                      , d = t ? t.apply(this, u) : u[0]
                      , h = a.cache;
                    if (h.has(d))
                        return h.get(d);
                    var m = e.apply(this, u);
                    return a.cache = h.set(d, m) || h,
                    m
                };
                return a.cache = new (ya.Cache || rn),
                a
            }
            ya.Cache = rn;
            function ba(e) {
                if (typeof e != "function")
                    throw new Ot(c);
                return function() {
                    var t = arguments;
                    switch (t.length) {
                    case 0:
                        return !e.call(this);
                    case 1:
                        return !e.call(this, t[0]);
                    case 2:
                        return !e.call(this, t[0], t[1]);
                    case 3:
                        return !e.call(this, t[0], t[1], t[2])
                    }
                    return !e.apply(this, t)
                }
            }
            function Yg(e) {
                return ac(2, e)
            }
            var Xg = Bh(function(e, t) {
                t = t.length == 1 && pe(t[0]) ? Le(t[0], gt(oe())) : Le(Qe(t, 1), gt(oe()));
                var a = t.length;
                return _e(function(u) {
                    for (var d = -1, h = et(u.length, a); ++d < h; )
                        u[d] = t[d].call(this, u[d]);
                    return vt(e, this, u)
                })
            })
              , ls = _e(function(e, t) {
                var a = kn(t, wr(ls));
                return on(e, W, r, t, a)
            })
              , cc = _e(function(e, t) {
                var a = kn(t, wr(cc));
                return on(e, V, r, t, a)
            })
              , Jg = sn(function(e, t) {
                return on(e, L, r, r, r, t)
            });
            function Qg(e, t) {
                if (typeof e != "function")
                    throw new Ot(c);
                return t = t === r ? t : ge(t),
                _e(e, t)
            }
            function Gg(e, t) {
                if (typeof e != "function")
                    throw new Ot(c);
                return t = t == null ? 0 : Ke(ge(t), 0),
                _e(function(a) {
                    var u = a[t]
                      , d = jn(a, 0, t);
                    return u && wn(d, u),
                    vt(e, this, d)
                })
            }
            function em(e, t, a) {
                var u = !0
                  , d = !0;
                if (typeof e != "function")
                    throw new Ot(c);
                return Ie(a) && (u = "leading"in a ? !!a.leading : u,
                d = "trailing"in a ? !!a.trailing : d),
                lc(e, t, {
                    leading: u,
                    maxWait: t,
                    trailing: d
                })
            }
            function tm(e) {
                return ic(e, 1)
            }
            function nm(e, t) {
                return ls(Ho(t), e)
            }
            function rm() {
                if (!arguments.length)
                    return [];
                var e = arguments[0];
                return pe(e) ? e : [e]
            }
            function im(e) {
                return Tt(e, k)
            }
            function am(e, t) {
                return t = typeof t == "function" ? t : r,
                Tt(e, k, t)
            }
            function om(e) {
                return Tt(e, O | k)
            }
            function sm(e, t) {
                return t = typeof t == "function" ? t : r,
                Tt(e, O | k, t)
            }
            function um(e, t) {
                return t == null || Ju(e, t, Ye(t))
            }
            function It(e, t) {
                return e === t || e !== e && t !== t
            }
            var lm = da(zo)
              , cm = da(function(e, t) {
                return e >= t
            })
              , Qn = rl(function() {
                return arguments
            }()) ? rl : function(e) {
                return Fe(e) && Pe.call(e, "callee") && !Wu.call(e, "callee")
            }
              , pe = $.isArray
              , dm = Su ? gt(Su) : bh;
            function dt(e) {
                return e != null && _a(e.length) && !ln(e)
            }
            function We(e) {
                return Fe(e) && dt(e)
            }
            function fm(e) {
                return e === !0 || e === !1 || Fe(e) && it(e) == ht
            }
            var En = $p || _s
              , pm = Ou ? gt(Ou) : _h;
            function hm(e) {
                return Fe(e) && e.nodeType === 1 && !ri(e)
            }
            function vm(e) {
                if (e == null)
                    return !0;
                if (dt(e) && (pe(e) || typeof e == "string" || typeof e.splice == "function" || En(e) || kr(e) || Qn(e)))
                    return !e.length;
                var t = tt(e);
                if (t == Nt || t == zt)
                    return !e.size;
                if (ti(e))
                    return !Io(e).length;
                for (var a in e)
                    if (Pe.call(e, a))
                        return !1;
                return !0
            }
            function gm(e, t) {
                return Qr(e, t)
            }
            function mm(e, t, a) {
                a = typeof a == "function" ? a : r;
                var u = a ? a(e, t) : r;
                return u === r ? Qr(e, t, r, a) : !!u
            }
            function cs(e) {
                if (!Fe(e))
                    return !1;
                var t = it(e);
                return t == qt || t == Ut || typeof e.message == "string" && typeof e.name == "string" && !ri(e)
            }
            function ym(e) {
                return typeof e == "number" && Uu(e)
            }
            function ln(e) {
                if (!Ie(e))
                    return !1;
                var t = it(e);
                return t == en || t == Qs || t == Wn || t == Rd
            }
            function dc(e) {
                return typeof e == "number" && e == ge(e)
            }
            function _a(e) {
                return typeof e == "number" && e > -1 && e % 1 == 0 && e <= K
            }
            function Ie(e) {
                var t = typeof e;
                return e != null && (t == "object" || t == "function")
            }
            function Fe(e) {
                return e != null && typeof e == "object"
            }
            var fc = $u ? gt($u) : wh;
            function bm(e, t) {
                return e === t || Lo(e, t, es(t))
            }
            function _m(e, t, a) {
                return a = typeof a == "function" ? a : r,
                Lo(e, t, es(t), a)
            }
            function xm(e) {
                return pc(e) && e != +e
            }
            function wm(e) {
                if (av(e))
                    throw new fe(l);
                return il(e)
            }
            function km(e) {
                return e === null
            }
            function Sm(e) {
                return e == null
            }
            function pc(e) {
                return typeof e == "number" || Fe(e) && it(e) == Ir
            }
            function ri(e) {
                if (!Fe(e) || it(e) != tn)
                    return !1;
                var t = Hi(e);
                if (t === null)
                    return !0;
                var a = Pe.call(t, "constructor") && t.constructor;
                return typeof a == "function" && a instanceof a && Wi.call(a) == _p
            }
            var ds = Tu ? gt(Tu) : kh;
            function Om(e) {
                return dc(e) && e >= -K && e <= K
            }
            var hc = ju ? gt(ju) : Sh;
            function xa(e) {
                return typeof e == "string" || !pe(e) && Fe(e) && it(e) == Zr
            }
            function yt(e) {
                return typeof e == "symbol" || Fe(e) && it(e) == Ni
            }
            var kr = Eu ? gt(Eu) : Oh;
            function $m(e) {
                return e === r
            }
            function Tm(e) {
                return Fe(e) && tt(e) == Rr
            }
            function jm(e) {
                return Fe(e) && it(e) == Wd
            }
            var Em = da(Do)
              , Am = da(function(e, t) {
                return e <= t
            });
            function vc(e) {
                if (!e)
                    return [];
                if (dt(e))
                    return xa(e) ? Bt(e) : ct(e);
                if (Vr && e[Vr])
                    return up(e[Vr]());
                var t = tt(e)
                  , a = t == Nt ? $o : t == zt ? Zi : Sr;
                return a(e)
            }
            function cn(e) {
                if (!e)
                    return e === 0 ? e : 0;
                if (e = At(e),
                e === B || e === -B) {
                    var t = e < 0 ? -1 : 1;
                    return t * te
                }
                return e === e ? e : 0
            }
            function ge(e) {
                var t = cn(e)
                  , a = t % 1;
                return t === t ? a ? t - a : t : 0
            }
            function gc(e) {
                return e ? Kn(ge(e), 0, ce) : 0
            }
            function At(e) {
                if (typeof e == "number")
                    return e;
                if (yt(e))
                    return me;
                if (Ie(e)) {
                    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                    e = Ie(t) ? t + "" : t
                }
                if (typeof e != "string")
                    return e === 0 ? e : +e;
                e = zu(e);
                var a = df.test(e);
                return a || pf.test(e) ? Uf(e.slice(2), a ? 2 : 8) : cf.test(e) ? me : +e
            }
            function mc(e) {
                return Kt(e, ft(e))
            }
            function Cm(e) {
                return e ? Kn(ge(e), -K, K) : e === 0 ? e : 0
            }
            function Ae(e) {
                return e == null ? "" : mt(e)
            }
            var Pm = _r(function(e, t) {
                if (ti(t) || dt(t)) {
                    Kt(t, Ye(t), e);
                    return
                }
                for (var a in t)
                    Pe.call(t, a) && Yr(e, a, t[a])
            })
              , yc = _r(function(e, t) {
                Kt(t, ft(t), e)
            })
              , wa = _r(function(e, t, a, u) {
                Kt(t, ft(t), e, u)
            })
              , Mm = _r(function(e, t, a, u) {
                Kt(t, Ye(t), e, u)
            })
              , Nm = sn(Po);
            function zm(e, t) {
                var a = br(e);
                return t == null ? a : Xu(a, t)
            }
            var Bm = _e(function(e, t) {
                e = Me(e);
                var a = -1
                  , u = t.length
                  , d = u > 2 ? t[2] : r;
                for (d && at(t[0], t[1], d) && (u = 1); ++a < u; )
                    for (var h = t[a], m = ft(h), b = -1, x = m.length; ++b < x; ) {
                        var M = m[b]
                          , z = e[M];
                        (z === r || It(z, gr[M]) && !Pe.call(e, M)) && (e[M] = h[M])
                    }
                return e
            })
              , Lm = _e(function(e) {
                return e.push(r, zl),
                vt(bc, r, e)
            });
            function Im(e, t) {
                return Cu(e, oe(t, 3), Ht)
            }
            function Dm(e, t) {
                return Cu(e, oe(t, 3), No)
            }
            function Zm(e, t) {
                return e == null ? e : Mo(e, oe(t, 3), ft)
            }
            function Rm(e, t) {
                return e == null ? e : tl(e, oe(t, 3), ft)
            }
            function Fm(e, t) {
                return e && Ht(e, oe(t, 3))
            }
            function Wm(e, t) {
                return e && No(e, oe(t, 3))
            }
            function Vm(e) {
                return e == null ? [] : ra(e, Ye(e))
            }
            function Um(e) {
                return e == null ? [] : ra(e, ft(e))
            }
            function fs(e, t, a) {
                var u = e == null ? r : Yn(e, t);
                return u === r ? a : u
            }
            function qm(e, t) {
                return e != null && Il(e, t, vh)
            }
            function ps(e, t) {
                return e != null && Il(e, t, gh)
            }
            var Hm = Al(function(e, t, a) {
                t != null && typeof t.toString != "function" && (t = Vi.call(t)),
                e[t] = a
            }, vs(pt))
              , Km = Al(function(e, t, a) {
                t != null && typeof t.toString != "function" && (t = Vi.call(t)),
                Pe.call(e, t) ? e[t].push(a) : e[t] = [a]
            }, oe)
              , Ym = _e(Jr);
            function Ye(e) {
                return dt(e) ? Ku(e) : Io(e)
            }
            function ft(e) {
                return dt(e) ? Ku(e, !0) : $h(e)
            }
            function Xm(e, t) {
                var a = {};
                return t = oe(t, 3),
                Ht(e, function(u, d, h) {
                    an(a, t(u, d, h), u)
                }),
                a
            }
            function Jm(e, t) {
                var a = {};
                return t = oe(t, 3),
                Ht(e, function(u, d, h) {
                    an(a, d, t(u, d, h))
                }),
                a
            }
            var Qm = _r(function(e, t, a) {
                ia(e, t, a)
            })
              , bc = _r(function(e, t, a, u) {
                ia(e, t, a, u)
            })
              , Gm = sn(function(e, t) {
                var a = {};
                if (e == null)
                    return a;
                var u = !1;
                t = Le(t, function(h) {
                    return h = Tn(h, e),
                    u || (u = h.length > 1),
                    h
                }),
                Kt(e, Qo(e), a),
                u && (a = Tt(a, O | N | k, Hh));
                for (var d = t.length; d--; )
                    Vo(a, t[d]);
                return a
            });
            function ey(e, t) {
                return _c(e, ba(oe(t)))
            }
            var ty = sn(function(e, t) {
                return e == null ? {} : jh(e, t)
            });
            function _c(e, t) {
                if (e == null)
                    return {};
                var a = Le(Qo(e), function(u) {
                    return [u]
                });
                return t = oe(t),
                dl(e, a, function(u, d) {
                    return t(u, d[0])
                })
            }
            function ny(e, t, a) {
                t = Tn(t, e);
                var u = -1
                  , d = t.length;
                for (d || (d = 1,
                e = r); ++u < d; ) {
                    var h = e == null ? r : e[Yt(t[u])];
                    h === r && (u = d,
                    h = a),
                    e = ln(h) ? h.call(e) : h
                }
                return e
            }
            function ry(e, t, a) {
                return e == null ? e : Gr(e, t, a)
            }
            function iy(e, t, a, u) {
                return u = typeof u == "function" ? u : r,
                e == null ? e : Gr(e, t, a, u)
            }
            var xc = Ml(Ye)
              , wc = Ml(ft);
            function ay(e, t, a) {
                var u = pe(e)
                  , d = u || En(e) || kr(e);
                if (t = oe(t, 4),
                a == null) {
                    var h = e && e.constructor;
                    d ? a = u ? new h : [] : Ie(e) ? a = ln(h) ? br(Hi(e)) : {} : a = {}
                }
                return (d ? St : Ht)(e, function(m, b, x) {
                    return t(a, m, b, x)
                }),
                a
            }
            function oy(e, t) {
                return e == null ? !0 : Vo(e, t)
            }
            function sy(e, t, a) {
                return e == null ? e : gl(e, t, Ho(a))
            }
            function uy(e, t, a, u) {
                return u = typeof u == "function" ? u : r,
                e == null ? e : gl(e, t, Ho(a), u)
            }
            function Sr(e) {
                return e == null ? [] : Oo(e, Ye(e))
            }
            function ly(e) {
                return e == null ? [] : Oo(e, ft(e))
            }
            function cy(e, t, a) {
                return a === r && (a = t,
                t = r),
                a !== r && (a = At(a),
                a = a === a ? a : 0),
                t !== r && (t = At(t),
                t = t === t ? t : 0),
                Kn(At(e), t, a)
            }
            function dy(e, t, a) {
                return t = cn(t),
                a === r ? (a = t,
                t = 0) : a = cn(a),
                e = At(e),
                mh(e, t, a)
            }
            function fy(e, t, a) {
                if (a && typeof a != "boolean" && at(e, t, a) && (t = a = r),
                a === r && (typeof t == "boolean" ? (a = t,
                t = r) : typeof e == "boolean" && (a = e,
                e = r)),
                e === r && t === r ? (e = 0,
                t = 1) : (e = cn(e),
                t === r ? (t = e,
                e = 0) : t = cn(t)),
                e > t) {
                    var u = e;
                    e = t,
                    t = u
                }
                if (a || e % 1 || t % 1) {
                    var d = qu();
                    return et(e + d * (t - e + Vf("1e-" + ((d + "").length - 1))), t)
                }
                return Ro(e, t)
            }
            var py = xr(function(e, t, a) {
                return t = t.toLowerCase(),
                e + (a ? kc(t) : t)
            });
            function kc(e) {
                return hs(Ae(e).toLowerCase())
            }
            function Sc(e) {
                return e = Ae(e),
                e && e.replace(vf, rp).replace(Nf, "")
            }
            function hy(e, t, a) {
                e = Ae(e),
                t = mt(t);
                var u = e.length;
                a = a === r ? u : Kn(ge(a), 0, u);
                var d = a;
                return a -= t.length,
                a >= 0 && e.slice(a, d) == t
            }
            function vy(e) {
                return e = Ae(e),
                e && Kd.test(e) ? e.replace(tu, ip) : e
            }
            function gy(e) {
                return e = Ae(e),
                e && ef.test(e) ? e.replace(uo, "\\$&") : e
            }
            var my = xr(function(e, t, a) {
                return e + (a ? "-" : "") + t.toLowerCase()
            })
              , yy = xr(function(e, t, a) {
                return e + (a ? " " : "") + t.toLowerCase()
            })
              , by = Tl("toLowerCase");
            function _y(e, t, a) {
                e = Ae(e),
                t = ge(t);
                var u = t ? hr(e) : 0;
                if (!t || u >= t)
                    return e;
                var d = (t - u) / 2;
                return ca(Ji(d), a) + e + ca(Xi(d), a)
            }
            function xy(e, t, a) {
                e = Ae(e),
                t = ge(t);
                var u = t ? hr(e) : 0;
                return t && u < t ? e + ca(t - u, a) : e
            }
            function wy(e, t, a) {
                e = Ae(e),
                t = ge(t);
                var u = t ? hr(e) : 0;
                return t && u < t ? ca(t - u, a) + e : e
            }
            function ky(e, t, a) {
                return a || t == null ? t = 0 : t && (t = +t),
                Ap(Ae(e).replace(lo, ""), t || 0)
            }
            function Sy(e, t, a) {
                return (a ? at(e, t, a) : t === r) ? t = 1 : t = ge(t),
                Fo(Ae(e), t)
            }
            function Oy() {
                var e = arguments
                  , t = Ae(e[0]);
                return e.length < 3 ? t : t.replace(e[1], e[2])
            }
            var $y = xr(function(e, t, a) {
                return e + (a ? "_" : "") + t.toLowerCase()
            });
            function Ty(e, t, a) {
                return a && typeof a != "number" && at(e, t, a) && (t = a = r),
                a = a === r ? ce : a >>> 0,
                a ? (e = Ae(e),
                e && (typeof t == "string" || t != null && !ds(t)) && (t = mt(t),
                !t && pr(e)) ? jn(Bt(e), 0, a) : e.split(t, a)) : []
            }
            var jy = xr(function(e, t, a) {
                return e + (a ? " " : "") + hs(t)
            });
            function Ey(e, t, a) {
                return e = Ae(e),
                a = a == null ? 0 : Kn(ge(a), 0, e.length),
                t = mt(t),
                e.slice(a, a + t.length) == t
            }
            function Ay(e, t, a) {
                var u = p.templateSettings;
                a && at(e, t, a) && (t = r),
                e = Ae(e),
                t = wa({}, t, u, Nl);
                var d = wa({}, t.imports, u.imports, Nl), h = Ye(d), m = Oo(d, h), b, x, M = 0, z = t.interpolate || zi, R = "__p += '", X = To((t.escape || zi).source + "|" + z.source + "|" + (z === nu ? lf : zi).source + "|" + (t.evaluate || zi).source + "|$", "g"), re = "//# sourceURL=" + (Pe.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Df + "]") + `
`;
                e.replace(X, function(ue, xe, Oe, bt, ot, _t) {
                    return Oe || (Oe = bt),
                    R += e.slice(M, _t).replace(gf, ap),
                    xe && (b = !0,
                    R += `' +
__e(` + xe + `) +
'`),
                    ot && (x = !0,
                    R += `';
` + ot + `;
__p += '`),
                    Oe && (R += `' +
((__t = (` + Oe + `)) == null ? '' : __t) +
'`),
                    M = _t + ue.length,
                    ue
                }),
                R += `';
`;
                var se = Pe.call(t, "variable") && t.variable;
                if (!se)
                    R = `with (obj) {
` + R + `
}
`;
                else if (sf.test(se))
                    throw new fe(f);
                R = (x ? R.replace(Vd, "") : R).replace(Ud, "$1").replace(qd, "$1;"),
                R = "function(" + (se || "obj") + `) {
` + (se ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (b ? ", __e = _.escape" : "") + (x ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + R + `return __p
}`;
                var ye = $c(function() {
                    return je(h, re + "return " + R).apply(r, m)
                });
                if (ye.source = R,
                cs(ye))
                    throw ye;
                return ye
            }
            function Cy(e) {
                return Ae(e).toLowerCase()
            }
            function Py(e) {
                return Ae(e).toUpperCase()
            }
            function My(e, t, a) {
                if (e = Ae(e),
                e && (a || t === r))
                    return zu(e);
                if (!e || !(t = mt(t)))
                    return e;
                var u = Bt(e)
                  , d = Bt(t)
                  , h = Bu(u, d)
                  , m = Lu(u, d) + 1;
                return jn(u, h, m).join("")
            }
            function Ny(e, t, a) {
                if (e = Ae(e),
                e && (a || t === r))
                    return e.slice(0, Du(e) + 1);
                if (!e || !(t = mt(t)))
                    return e;
                var u = Bt(e)
                  , d = Lu(u, Bt(t)) + 1;
                return jn(u, 0, d).join("")
            }
            function zy(e, t, a) {
                if (e = Ae(e),
                e && (a || t === r))
                    return e.replace(lo, "");
                if (!e || !(t = mt(t)))
                    return e;
                var u = Bt(e)
                  , d = Bu(u, Bt(t));
                return jn(u, d).join("")
            }
            function By(e, t) {
                var a = ne
                  , u = Y;
                if (Ie(t)) {
                    var d = "separator"in t ? t.separator : d;
                    a = "length"in t ? ge(t.length) : a,
                    u = "omission"in t ? mt(t.omission) : u
                }
                e = Ae(e);
                var h = e.length;
                if (pr(e)) {
                    var m = Bt(e);
                    h = m.length
                }
                if (a >= h)
                    return e;
                var b = a - hr(u);
                if (b < 1)
                    return u;
                var x = m ? jn(m, 0, b).join("") : e.slice(0, b);
                if (d === r)
                    return x + u;
                if (m && (b += x.length - b),
                ds(d)) {
                    if (e.slice(b).search(d)) {
                        var M, z = x;
                        for (d.global || (d = To(d.source, Ae(ru.exec(d)) + "g")),
                        d.lastIndex = 0; M = d.exec(z); )
                            var R = M.index;
                        x = x.slice(0, R === r ? b : R)
                    }
                } else if (e.indexOf(mt(d), b) != b) {
                    var X = x.lastIndexOf(d);
                    X > -1 && (x = x.slice(0, X))
                }
                return x + u
            }
            function Ly(e) {
                return e = Ae(e),
                e && Hd.test(e) ? e.replace(eu, fp) : e
            }
            var Iy = xr(function(e, t, a) {
                return e + (a ? " " : "") + t.toUpperCase()
            })
              , hs = Tl("toUpperCase");
            function Oc(e, t, a) {
                return e = Ae(e),
                t = a ? r : t,
                t === r ? sp(e) ? vp(e) : Qf(e) : e.match(t) || []
            }
            var $c = _e(function(e, t) {
                try {
                    return vt(e, r, t)
                } catch (a) {
                    return cs(a) ? a : new fe(a)
                }
            })
              , Dy = sn(function(e, t) {
                return St(t, function(a) {
                    a = Yt(a),
                    an(e, a, us(e[a], e))
                }),
                e
            });
            function Zy(e) {
                var t = e == null ? 0 : e.length
                  , a = oe();
                return e = t ? Le(e, function(u) {
                    if (typeof u[1] != "function")
                        throw new Ot(c);
                    return [a(u[0]), u[1]]
                }) : [],
                _e(function(u) {
                    for (var d = -1; ++d < t; ) {
                        var h = e[d];
                        if (vt(h[0], this, u))
                            return vt(h[1], this, u)
                    }
                })
            }
            function Ry(e) {
                return fh(Tt(e, O))
            }
            function vs(e) {
                return function() {
                    return e
                }
            }
            function Fy(e, t) {
                return e == null || e !== e ? t : e
            }
            var Wy = El()
              , Vy = El(!0);
            function pt(e) {
                return e
            }
            function gs(e) {
                return al(typeof e == "function" ? e : Tt(e, O))
            }
            function Uy(e) {
                return sl(Tt(e, O))
            }
            function qy(e, t) {
                return ul(e, Tt(t, O))
            }
            var Hy = _e(function(e, t) {
                return function(a) {
                    return Jr(a, e, t)
                }
            })
              , Ky = _e(function(e, t) {
                return function(a) {
                    return Jr(e, a, t)
                }
            });
            function ms(e, t, a) {
                var u = Ye(t)
                  , d = ra(t, u);
                a == null && !(Ie(t) && (d.length || !u.length)) && (a = t,
                t = e,
                e = this,
                d = ra(t, Ye(t)));
                var h = !(Ie(a) && "chain"in a) || !!a.chain
                  , m = ln(e);
                return St(d, function(b) {
                    var x = t[b];
                    e[b] = x,
                    m && (e.prototype[b] = function() {
                        var M = this.__chain__;
                        if (h || M) {
                            var z = e(this.__wrapped__)
                              , R = z.__actions__ = ct(this.__actions__);
                            return R.push({
                                func: x,
                                args: arguments,
                                thisArg: e
                            }),
                            z.__chain__ = M,
                            z
                        }
                        return x.apply(e, wn([this.value()], arguments))
                    }
                    )
                }),
                e
            }
            function Yy() {
                return Je._ === this && (Je._ = xp),
                this
            }
            function ys() {}
            function Xy(e) {
                return e = ge(e),
                _e(function(t) {
                    return ll(t, e)
                })
            }
            var Jy = Yo(Le)
              , Qy = Yo(Au)
              , Gy = Yo(_o);
            function Tc(e) {
                return ns(e) ? xo(Yt(e)) : Eh(e)
            }
            function eb(e) {
                return function(t) {
                    return e == null ? r : Yn(e, t)
                }
            }
            var tb = Cl()
              , nb = Cl(!0);
            function bs() {
                return []
            }
            function _s() {
                return !1
            }
            function rb() {
                return {}
            }
            function ib() {
                return ""
            }
            function ab() {
                return !0
            }
            function ob(e, t) {
                if (e = ge(e),
                e < 1 || e > K)
                    return [];
                var a = ce
                  , u = et(e, ce);
                t = oe(t),
                e -= ce;
                for (var d = So(u, t); ++a < e; )
                    t(a);
                return d
            }
            function sb(e) {
                return pe(e) ? Le(e, Yt) : yt(e) ? [e] : ct(Hl(Ae(e)))
            }
            function ub(e) {
                var t = ++bp;
                return Ae(e) + t
            }
            var lb = la(function(e, t) {
                return e + t
            }, 0)
              , cb = Xo("ceil")
              , db = la(function(e, t) {
                return e / t
            }, 1)
              , fb = Xo("floor");
            function pb(e) {
                return e && e.length ? na(e, pt, zo) : r
            }
            function hb(e, t) {
                return e && e.length ? na(e, oe(t, 2), zo) : r
            }
            function vb(e) {
                return Mu(e, pt)
            }
            function gb(e, t) {
                return Mu(e, oe(t, 2))
            }
            function mb(e) {
                return e && e.length ? na(e, pt, Do) : r
            }
            function yb(e, t) {
                return e && e.length ? na(e, oe(t, 2), Do) : r
            }
            var bb = la(function(e, t) {
                return e * t
            }, 1)
              , _b = Xo("round")
              , xb = la(function(e, t) {
                return e - t
            }, 0);
            function wb(e) {
                return e && e.length ? ko(e, pt) : 0
            }
            function kb(e, t) {
                return e && e.length ? ko(e, oe(t, 2)) : 0
            }
            return p.after = Ug,
            p.ary = ic,
            p.assign = Pm,
            p.assignIn = yc,
            p.assignInWith = wa,
            p.assignWith = Mm,
            p.at = Nm,
            p.before = ac,
            p.bind = us,
            p.bindAll = Dy,
            p.bindKey = oc,
            p.castArray = rm,
            p.chain = tc,
            p.chunk = fv,
            p.compact = pv,
            p.concat = hv,
            p.cond = Zy,
            p.conforms = Ry,
            p.constant = vs,
            p.countBy = wg,
            p.create = zm,
            p.curry = sc,
            p.curryRight = uc,
            p.debounce = lc,
            p.defaults = Bm,
            p.defaultsDeep = Lm,
            p.defer = qg,
            p.delay = Hg,
            p.difference = vv,
            p.differenceBy = gv,
            p.differenceWith = mv,
            p.drop = yv,
            p.dropRight = bv,
            p.dropRightWhile = _v,
            p.dropWhile = xv,
            p.fill = wv,
            p.filter = Sg,
            p.flatMap = Tg,
            p.flatMapDeep = jg,
            p.flatMapDepth = Eg,
            p.flatten = Jl,
            p.flattenDeep = kv,
            p.flattenDepth = Sv,
            p.flip = Kg,
            p.flow = Wy,
            p.flowRight = Vy,
            p.fromPairs = Ov,
            p.functions = Vm,
            p.functionsIn = Um,
            p.groupBy = Ag,
            p.initial = Tv,
            p.intersection = jv,
            p.intersectionBy = Ev,
            p.intersectionWith = Av,
            p.invert = Hm,
            p.invertBy = Km,
            p.invokeMap = Pg,
            p.iteratee = gs,
            p.keyBy = Mg,
            p.keys = Ye,
            p.keysIn = ft,
            p.map = ga,
            p.mapKeys = Xm,
            p.mapValues = Jm,
            p.matches = Uy,
            p.matchesProperty = qy,
            p.memoize = ya,
            p.merge = Qm,
            p.mergeWith = bc,
            p.method = Hy,
            p.methodOf = Ky,
            p.mixin = ms,
            p.negate = ba,
            p.nthArg = Xy,
            p.omit = Gm,
            p.omitBy = ey,
            p.once = Yg,
            p.orderBy = Ng,
            p.over = Jy,
            p.overArgs = Xg,
            p.overEvery = Qy,
            p.overSome = Gy,
            p.partial = ls,
            p.partialRight = cc,
            p.partition = zg,
            p.pick = ty,
            p.pickBy = _c,
            p.property = Tc,
            p.propertyOf = eb,
            p.pull = Nv,
            p.pullAll = Gl,
            p.pullAllBy = zv,
            p.pullAllWith = Bv,
            p.pullAt = Lv,
            p.range = tb,
            p.rangeRight = nb,
            p.rearg = Jg,
            p.reject = Ig,
            p.remove = Iv,
            p.rest = Qg,
            p.reverse = os,
            p.sampleSize = Zg,
            p.set = ry,
            p.setWith = iy,
            p.shuffle = Rg,
            p.slice = Dv,
            p.sortBy = Vg,
            p.sortedUniq = qv,
            p.sortedUniqBy = Hv,
            p.split = Ty,
            p.spread = Gg,
            p.tail = Kv,
            p.take = Yv,
            p.takeRight = Xv,
            p.takeRightWhile = Jv,
            p.takeWhile = Qv,
            p.tap = pg,
            p.throttle = em,
            p.thru = va,
            p.toArray = vc,
            p.toPairs = xc,
            p.toPairsIn = wc,
            p.toPath = sb,
            p.toPlainObject = mc,
            p.transform = ay,
            p.unary = tm,
            p.union = Gv,
            p.unionBy = eg,
            p.unionWith = tg,
            p.uniq = ng,
            p.uniqBy = rg,
            p.uniqWith = ig,
            p.unset = oy,
            p.unzip = ss,
            p.unzipWith = ec,
            p.update = sy,
            p.updateWith = uy,
            p.values = Sr,
            p.valuesIn = ly,
            p.without = ag,
            p.words = Oc,
            p.wrap = nm,
            p.xor = og,
            p.xorBy = sg,
            p.xorWith = ug,
            p.zip = lg,
            p.zipObject = cg,
            p.zipObjectDeep = dg,
            p.zipWith = fg,
            p.entries = xc,
            p.entriesIn = wc,
            p.extend = yc,
            p.extendWith = wa,
            ms(p, p),
            p.add = lb,
            p.attempt = $c,
            p.camelCase = py,
            p.capitalize = kc,
            p.ceil = cb,
            p.clamp = cy,
            p.clone = im,
            p.cloneDeep = om,
            p.cloneDeepWith = sm,
            p.cloneWith = am,
            p.conformsTo = um,
            p.deburr = Sc,
            p.defaultTo = Fy,
            p.divide = db,
            p.endsWith = hy,
            p.eq = It,
            p.escape = vy,
            p.escapeRegExp = gy,
            p.every = kg,
            p.find = Og,
            p.findIndex = Yl,
            p.findKey = Im,
            p.findLast = $g,
            p.findLastIndex = Xl,
            p.findLastKey = Dm,
            p.floor = fb,
            p.forEach = nc,
            p.forEachRight = rc,
            p.forIn = Zm,
            p.forInRight = Rm,
            p.forOwn = Fm,
            p.forOwnRight = Wm,
            p.get = fs,
            p.gt = lm,
            p.gte = cm,
            p.has = qm,
            p.hasIn = ps,
            p.head = Ql,
            p.identity = pt,
            p.includes = Cg,
            p.indexOf = $v,
            p.inRange = dy,
            p.invoke = Ym,
            p.isArguments = Qn,
            p.isArray = pe,
            p.isArrayBuffer = dm,
            p.isArrayLike = dt,
            p.isArrayLikeObject = We,
            p.isBoolean = fm,
            p.isBuffer = En,
            p.isDate = pm,
            p.isElement = hm,
            p.isEmpty = vm,
            p.isEqual = gm,
            p.isEqualWith = mm,
            p.isError = cs,
            p.isFinite = ym,
            p.isFunction = ln,
            p.isInteger = dc,
            p.isLength = _a,
            p.isMap = fc,
            p.isMatch = bm,
            p.isMatchWith = _m,
            p.isNaN = xm,
            p.isNative = wm,
            p.isNil = Sm,
            p.isNull = km,
            p.isNumber = pc,
            p.isObject = Ie,
            p.isObjectLike = Fe,
            p.isPlainObject = ri,
            p.isRegExp = ds,
            p.isSafeInteger = Om,
            p.isSet = hc,
            p.isString = xa,
            p.isSymbol = yt,
            p.isTypedArray = kr,
            p.isUndefined = $m,
            p.isWeakMap = Tm,
            p.isWeakSet = jm,
            p.join = Cv,
            p.kebabCase = my,
            p.last = Et,
            p.lastIndexOf = Pv,
            p.lowerCase = yy,
            p.lowerFirst = by,
            p.lt = Em,
            p.lte = Am,
            p.max = pb,
            p.maxBy = hb,
            p.mean = vb,
            p.meanBy = gb,
            p.min = mb,
            p.minBy = yb,
            p.stubArray = bs,
            p.stubFalse = _s,
            p.stubObject = rb,
            p.stubString = ib,
            p.stubTrue = ab,
            p.multiply = bb,
            p.nth = Mv,
            p.noConflict = Yy,
            p.noop = ys,
            p.now = ma,
            p.pad = _y,
            p.padEnd = xy,
            p.padStart = wy,
            p.parseInt = ky,
            p.random = fy,
            p.reduce = Bg,
            p.reduceRight = Lg,
            p.repeat = Sy,
            p.replace = Oy,
            p.result = ny,
            p.round = _b,
            p.runInContext = _,
            p.sample = Dg,
            p.size = Fg,
            p.snakeCase = $y,
            p.some = Wg,
            p.sortedIndex = Zv,
            p.sortedIndexBy = Rv,
            p.sortedIndexOf = Fv,
            p.sortedLastIndex = Wv,
            p.sortedLastIndexBy = Vv,
            p.sortedLastIndexOf = Uv,
            p.startCase = jy,
            p.startsWith = Ey,
            p.subtract = xb,
            p.sum = wb,
            p.sumBy = kb,
            p.template = Ay,
            p.times = ob,
            p.toFinite = cn,
            p.toInteger = ge,
            p.toLength = gc,
            p.toLower = Cy,
            p.toNumber = At,
            p.toSafeInteger = Cm,
            p.toString = Ae,
            p.toUpper = Py,
            p.trim = My,
            p.trimEnd = Ny,
            p.trimStart = zy,
            p.truncate = By,
            p.unescape = Ly,
            p.uniqueId = ub,
            p.upperCase = Iy,
            p.upperFirst = hs,
            p.each = nc,
            p.eachRight = rc,
            p.first = Ql,
            ms(p, function() {
                var e = {};
                return Ht(p, function(t, a) {
                    Pe.call(p.prototype, a) || (e[a] = t)
                }),
                e
            }(), {
                chain: !1
            }),
            p.VERSION = o,
            St(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                p[e].placeholder = p
            }),
            St(["drop", "take"], function(e, t) {
                we.prototype[e] = function(a) {
                    a = a === r ? 1 : Ke(ge(a), 0);
                    var u = this.__filtered__ && !t ? new we(this) : this.clone();
                    return u.__filtered__ ? u.__takeCount__ = et(a, u.__takeCount__) : u.__views__.push({
                        size: et(a, ce),
                        type: e + (u.__dir__ < 0 ? "Right" : "")
                    }),
                    u
                }
                ,
                we.prototype[e + "Right"] = function(a) {
                    return this.reverse()[e](a).reverse()
                }
            }),
            St(["filter", "map", "takeWhile"], function(e, t) {
                var a = t + 1
                  , u = a == E || a == F;
                we.prototype[e] = function(d) {
                    var h = this.clone();
                    return h.__iteratees__.push({
                        iteratee: oe(d, 3),
                        type: a
                    }),
                    h.__filtered__ = h.__filtered__ || u,
                    h
                }
            }),
            St(["head", "last"], function(e, t) {
                var a = "take" + (t ? "Right" : "");
                we.prototype[e] = function() {
                    return this[a](1).value()[0]
                }
            }),
            St(["initial", "tail"], function(e, t) {
                var a = "drop" + (t ? "" : "Right");
                we.prototype[e] = function() {
                    return this.__filtered__ ? new we(this) : this[a](1)
                }
            }),
            we.prototype.compact = function() {
                return this.filter(pt)
            }
            ,
            we.prototype.find = function(e) {
                return this.filter(e).head()
            }
            ,
            we.prototype.findLast = function(e) {
                return this.reverse().find(e)
            }
            ,
            we.prototype.invokeMap = _e(function(e, t) {
                return typeof e == "function" ? new we(this) : this.map(function(a) {
                    return Jr(a, e, t)
                })
            }),
            we.prototype.reject = function(e) {
                return this.filter(ba(oe(e)))
            }
            ,
            we.prototype.slice = function(e, t) {
                e = ge(e);
                var a = this;
                return a.__filtered__ && (e > 0 || t < 0) ? new we(a) : (e < 0 ? a = a.takeRight(-e) : e && (a = a.drop(e)),
                t !== r && (t = ge(t),
                a = t < 0 ? a.dropRight(-t) : a.take(t - e)),
                a)
            }
            ,
            we.prototype.takeRightWhile = function(e) {
                return this.reverse().takeWhile(e).reverse()
            }
            ,
            we.prototype.toArray = function() {
                return this.take(ce)
            }
            ,
            Ht(we.prototype, function(e, t) {
                var a = /^(?:filter|find|map|reject)|While$/.test(t)
                  , u = /^(?:head|last)$/.test(t)
                  , d = p[u ? "take" + (t == "last" ? "Right" : "") : t]
                  , h = u || /^find/.test(t);
                d && (p.prototype[t] = function() {
                    var m = this.__wrapped__
                      , b = u ? [1] : arguments
                      , x = m instanceof we
                      , M = b[0]
                      , z = x || pe(m)
                      , R = function(xe) {
                        var Oe = d.apply(p, wn([xe], b));
                        return u && X ? Oe[0] : Oe
                    };
                    z && a && typeof M == "function" && M.length != 1 && (x = z = !1);
                    var X = this.__chain__
                      , re = !!this.__actions__.length
                      , se = h && !X
                      , ye = x && !re;
                    if (!h && z) {
                        m = ye ? m : new we(this);
                        var ue = e.apply(m, b);
                        return ue.__actions__.push({
                            func: va,
                            args: [R],
                            thisArg: r
                        }),
                        new $t(ue,X)
                    }
                    return se && ye ? e.apply(this, b) : (ue = this.thru(R),
                    se ? u ? ue.value()[0] : ue.value() : ue)
                }
                )
            }),
            St(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                var t = Ri[e]
                  , a = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                  , u = /^(?:pop|shift)$/.test(e);
                p.prototype[e] = function() {
                    var d = arguments;
                    if (u && !this.__chain__) {
                        var h = this.value();
                        return t.apply(pe(h) ? h : [], d)
                    }
                    return this[a](function(m) {
                        return t.apply(pe(m) ? m : [], d)
                    })
                }
            }),
            Ht(we.prototype, function(e, t) {
                var a = p[t];
                if (a) {
                    var u = a.name + "";
                    Pe.call(yr, u) || (yr[u] = []),
                    yr[u].push({
                        name: t,
                        func: a
                    })
                }
            }),
            yr[ua(r, Z).name] = [{
                name: "wrapper",
                func: r
            }],
            we.prototype.clone = Lp,
            we.prototype.reverse = Ip,
            we.prototype.value = Dp,
            p.prototype.at = hg,
            p.prototype.chain = vg,
            p.prototype.commit = gg,
            p.prototype.next = mg,
            p.prototype.plant = bg,
            p.prototype.reverse = _g,
            p.prototype.toJSON = p.prototype.valueOf = p.prototype.value = xg,
            p.prototype.first = p.prototype.head,
            Vr && (p.prototype[Vr] = yg),
            p
        }
          , vr = gp();
        Vn ? ((Vn.exports = vr)._ = vr,
        go._ = vr) : Je._ = vr
    }
    ).call(Pn)
}
)(Aa, Aa.exports);
var vn = Aa.exports;
const Vs = f_({
    twMergeConfig: {
        classGroups: {
            "background-color": [{
                bg: ["base", "strong", "moderate", "neutral"]
            }],
            "font-size": [{
                text: ["button", "button-xlarge", "button-large", "button-small", "button-xsmall", "input", "input-large", "input-small"]
            }],
            h: [{
                h: ["default", "xlarge", "large", "small", "xsmall"]
            }],
            rounded: [{
                rounded: ["base", "tag"]
            }]
        }
    }
})
  , p_ = Ct("circle", {
    class: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
}, null, -1)
  , h_ = Ct("path", {
    class: "opacity-75",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
    fill: "currentColor"
}, null, -1)
  , v_ = [p_, h_]
  , g_ = Object.assign({
    name: "BcSpinner"
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: ""
            })
        },
        size: {
            type: [Number, String],
            default: 24
        },
        color: {
            type: String,
            values: ["default", "primary", "success", "warning", "danger", "white"],
            default: "default"
        }
    },
    setup(n) {
        const i = n
          , r = ae(()=>Mt({
            slots: {
                base: "animate-spin"
            },
            variants: {
                color: {
                    default: "text-strong",
                    primary: "text-primary",
                    success: "text-success",
                    warning: "text-warning",
                    danger: "text-danger",
                    white: "text-white"
                }
            }
        })({
            color: i.color
        }));
        return (o,s)=>(Ee(),
        Ze("svg", {
            fill: "none",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            class: $e([r.value.base({
                class: n.classes.base
            }), "bc-spinner"]),
            style: Cr({
                width: `${n.size}px`,
                height: `${n.size}px`
            })
        }, v_, 6))
    }
})
  , m_ = ["disabled", "type"]
  , Es = Object.assign({
    name: "BcButton"
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                icon: ""
            })
        },
        color: {
            type: String,
            values: ["default", "neutral", "primary", "info", "success", "warning", "danger"],
            default: "default"
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        fullWidth: {
            type: Boolean,
            default: !1
        },
        icon: {
            type: String
        },
        loading: {
            type: Boolean,
            default: !1
        },
        round: {
            type: Boolean,
            default: !1
        },
        size: {
            type: String,
            values: ["default", "xlarge", "large", "small", "xsmall"],
            default: "default"
        },
        square: {
            type: Boolean,
            default: !1
        },
        suffixIcon: {
            type: String
        },
        type: {
            type: String,
            values: ["button", "submit", "reset"],
            default: "button"
        },
        variant: {
            type: String,
            values: ["default", "light", "outline", "outline-white", "ghost", "text", "plain"],
            default: "default"
        }
    },
    setup(n) {
        const i = n
          , r = ae(()=>i.variant === "text")
          , o = ae(()=>i.variant === "default" ? i.color === "default" ? i.color : "white" : i.color)
          , s = ae(()=>i.size === "xlarge" ? 20 : i.size === "xsmall" ? 12 : 16)
          , l = ae(()=>Vs({
            slots: {
                base: "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-base text-center font-bc-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                icon: ""
            },
            variants: {
                fullWidth: {
                    true: "w-full"
                },
                round: {
                    true: "rounded-full"
                },
                size: {
                    default: {
                        base: "h-default text-button px-4",
                        icon: "text-[18px] leading-none"
                    },
                    xlarge: {
                        base: "h-xlarge text-button-xlarge px-6",
                        icon: "text-[20px] leading-none"
                    },
                    large: {
                        base: "text-button-large h-large px-5",
                        icon: "text-[20px] leading-none"
                    },
                    small: {
                        base: "h-small text-button-small px-4",
                        icon: "text-[16px] leading-none"
                    },
                    xsmall: {
                        base: "h-xsmall text-button-xsmall px-3",
                        icon: "text-[14px] leading-none"
                    }
                },
                square: {
                    true: "px-0"
                },
                variant: {
                    outline: {
                        base: "bg-transparent"
                    },
                    "outline-white": {
                        base: "bg-white"
                    },
                    plain: {
                        base: "bg-white"
                    },
                    text: {
                        base: "h-fit p-0"
                    }
                }
            },
            compoundVariants: [{
                variant: ["outline", "outline-white"],
                class: "border border-current"
            }, {
                color: "default",
                variant: "default",
                class: "bg-moderate text-moderate"
            }, {
                color: "default",
                variant: "default",
                disabled: !1,
                class: "hover:bg-strong"
            }, {
                color: "default",
                variant: "light",
                class: "bg-base text-moderate"
            }, {
                color: "default",
                variant: "light",
                disabled: !1,
                class: "hover:bg-moderate"
            }, {
                color: "default",
                variant: ["outline", "outline-white"],
                class: "border-base text-moderate"
            }, {
                color: "default",
                variant: ["outline", "outline-white"],
                disabled: !1,
                class: "hover:border-base hover:bg-base"
            }, {
                color: "default",
                variant: "ghost",
                class: "text-moderate"
            }, {
                color: "default",
                variant: "ghost",
                disabled: !1,
                class: "hover:bg-base"
            }, {
                color: "default",
                variant: "plain",
                class: "text-moderate"
            }, {
                color: "default",
                variant: "plain",
                disabled: !1,
                class: "hover:bg-base"
            }, {
                color: "default",
                variant: "text",
                class: "text-moderate"
            }, {
                color: "default",
                variant: "text",
                disabled: !1,
                class: "hover:text-strong"
            }, {
                color: "neutral",
                variant: "default",
                class: "bg-neutral text-white"
            }, {
                color: "neutral",
                variant: "default",
                disabled: !1,
                class: "hover:bg-neutral-hover"
            }, {
                color: "neutral",
                variant: "light",
                class: "bg-neutral-light text-neutral"
            }, {
                color: "neutral",
                variant: "light",
                disabled: !1,
                class: "hover:bg-neutral-light-hover"
            }, {
                color: "neutral",
                variant: ["outline", "outline-white"],
                class: "border-neutral text-neutral"
            }, {
                color: "neutral",
                variant: ["outline", "outline-white"],
                disabled: !1,
                class: "hover:bg-neutral-light"
            }, {
                color: "neutral",
                variant: "ghost",
                class: "text-neutral"
            }, {
                color: "neutral",
                variant: "ghost",
                disabled: !1,
                class: "hover:bg-neutral-light"
            }, {
                color: "neutral",
                variant: "plain",
                class: "text-neutral"
            }, {
                color: "neutral",
                variant: "plain",
                disabled: !1,
                class: "hover:bg-neutral-light"
            }, {
                color: "neutral",
                variant: "text",
                class: "text-neutral"
            }, {
                color: "neutral",
                variant: "text",
                disabled: !1,
                class: "hover:text-neutral-hover"
            }, {
                color: "primary",
                variant: "default",
                class: "bg-primary text-white"
            }, {
                color: "primary",
                variant: "default",
                disabled: !1,
                class: "hover:bg-primary-hover"
            }, {
                color: "primary",
                variant: "light",
                class: "bg-primary-light text-primary"
            }, {
                color: "primary",
                variant: "light",
                disabled: !1,
                class: "hover:bg-primary-light-hover"
            }, {
                color: "primary",
                variant: "outline",
                class: "text-primary"
            }, {
                color: "primary",
                variant: "outline",
                disabled: !1,
                class: "hover:bg-primary-light"
            }, {
                color: "primary",
                variant: "ghost",
                class: "text-primary"
            }, {
                color: "primary",
                variant: "ghost",
                disabled: !1,
                class: "hover:bg-primary-light"
            }, {
                color: "primary",
                variant: "plain",
                class: "text-primary"
            }, {
                color: "primary",
                variant: "plain",
                disabled: !1,
                class: "hover:bg-primary-light"
            }, {
                color: "primary",
                variant: "text",
                class: "text-primary"
            }, {
                color: "primary",
                variant: "text",
                disabled: !1,
                class: "hover:text-primary-hover"
            }, {
                color: "success",
                variant: "default",
                class: "bg-success text-white"
            }, {
                color: "success",
                variant: "default",
                disabled: !1,
                class: "hover:bg-success-hover"
            }, {
                color: "success",
                variant: "light",
                class: "bg-success-light text-success"
            }, {
                color: "success",
                variant: "light",
                disabled: !1,
                class: "hover:bg-success-light-hover"
            }, {
                color: "success",
                variant: "outline",
                class: "text-success"
            }, {
                color: "success",
                variant: "outline",
                disabled: !1,
                class: "hover:bg-success-light"
            }, {
                color: "success",
                variant: "ghost",
                class: "text-success"
            }, {
                color: "success",
                variant: "ghost",
                disabled: !1,
                class: "hover:bg-success-light"
            }, {
                color: "success",
                variant: "plain",
                class: "text-success"
            }, {
                color: "success",
                variant: "plain",
                disabled: !1,
                class: "hover:bg-success-light"
            }, {
                color: "success",
                variant: "text",
                class: "text-success"
            }, {
                color: "success",
                variant: "text",
                disabled: !1,
                class: "hover:text-success-hover"
            }, {
                color: "warning",
                variant: "default",
                class: "bg-warning text-white"
            }, {
                color: "warning",
                variant: "default",
                disabled: !1,
                class: "hover:bg-warning-hover"
            }, {
                color: "warning",
                variant: "light",
                class: "bg-warning-light text-warning"
            }, {
                color: "warning",
                variant: "light",
                disabled: !1,
                class: "hover:bg-warning-light-hover"
            }, {
                color: "warning",
                variant: "outline",
                class: "text-warning"
            }, {
                color: "warning",
                variant: "outline",
                disabled: !1,
                class: "hover:bg-warning-light"
            }, {
                color: "warning",
                variant: "ghost",
                class: "text-warning"
            }, {
                color: "warning",
                variant: "ghost",
                disabled: !1,
                class: "hover:bg-warning-light"
            }, {
                color: "warning",
                variant: "plain",
                class: "text-warning"
            }, {
                color: "warning",
                variant: "plain",
                disabled: !1,
                class: "hover:bg-warning-light"
            }, {
                color: "warning",
                variant: "text",
                class: "text-warning"
            }, {
                color: "warning",
                variant: "text",
                disabled: !1,
                class: "hover:text-warning-hover"
            }, {
                color: "danger",
                variant: "default",
                class: "bg-danger text-white"
            }, {
                color: "danger",
                variant: "default",
                disabled: !1,
                class: "hover:bg-danger-hover"
            }, {
                color: "danger",
                variant: "light",
                class: "bg-danger-light text-danger"
            }, {
                color: "danger",
                variant: "light",
                disabled: !1,
                class: "hover:bg-danger-light-hover"
            }, {
                color: "danger",
                variant: "outline",
                class: "text-danger"
            }, {
                color: "danger",
                variant: "outline",
                disabled: !1,
                class: "hover:bg-danger-light"
            }, {
                color: "danger",
                variant: "ghost",
                class: "text-danger"
            }, {
                color: "danger",
                variant: "ghost",
                disabled: !1,
                class: "hover:bg-danger-light"
            }, {
                color: "danger",
                variant: "plain",
                class: "text-danger"
            }, {
                color: "danger",
                variant: "plain",
                disabled: !1,
                class: "hover:bg-danger-light"
            }, {
                color: "danger",
                variant: "text",
                class: "text-danger"
            }, {
                color: "danger",
                variant: "text",
                disabled: !1,
                class: "hover:text-danger-hover"
            }, {
                size: "default",
                isText: !1,
                square: !0,
                class: "w-10"
            }, {
                size: "xlarge",
                isText: !1,
                square: !0,
                class: "w-12"
            }, {
                size: "large",
                isText: !1,
                square: !0,
                class: "w-11"
            }, {
                size: "small",
                isText: !1,
                square: !0,
                class: "w-9"
            }, {
                size: "xsmall",
                isText: !1,
                square: !0,
                class: "w-8"
            }]
        })({
            color: i.color,
            disabled: i.disabled || i.loading,
            fullWidth: i.fullWidth,
            isText: r.value,
            round: i.round,
            size: i.size,
            square: i.square,
            variant: i.variant
        }));
        return (c,f)=>(Ee(),
        Ze("button", {
            class: $e([l.value.base({
                class: n.classes.base
            }), "bc-button"]),
            disabled: n.disabled || n.loading,
            type: n.type
        }, [n.loading ? qe(c.$slots, "loading", {
            key: 0
        }, ()=>[Tr(g_, {
            color: o.value,
            size: s.value
        }, null, 8, ["color", "size"])]) : ut("", !0), qe(c.$slots, "prefix", {}, ()=>[n.icon ? (Ee(),
        Ze("i", {
            key: 0,
            class: $e([n.icon, l.value.icon({
                class: n.classes.icon
            }), "bc-button__icon"])
        }, null, 2)) : ut("", !0)]), qe(c.$slots, "default"), qe(c.$slots, "suffix", {}, ()=>[n.suffixIcon ? (Ee(),
        Ze("i", {
            key: 0,
            class: $e([n.suffixIcon, l.value.icon({
                class: n.classes.icon
            }), "bc-button__icon"])
        }, null, 2)) : ut("", !0)])], 10, m_))
    }
})
  , y_ = Object.assign({
    name: "BcActionBar"
}, {
    __name: "index",
    props: {
        align: {
            type: String,
            values: ["left", "center", "right"],
            default: "right"
        },
        cancelButtonText: {
            type: String,
            default: "Cancel"
        },
        cancelButtonProps: {
            type: Object,
            default: ()=>({
                variant: "outline"
            })
        },
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                button: ""
            })
        },
        confirmButtonText: {
            type: String,
            default: "Confirm"
        },
        confirmButtonProps: {
            type: Object,
            default: ()=>({
                color: "primary"
            })
        },
        confirmButtonType: {
            type: String,
            values: ["button", "submit", "reset"],
            default: "button"
        },
        direction: {
            type: String,
            values: ["row", "row-reverse", "col", "col-reverse"],
            default: "row"
        },
        hasCancelButton: {
            type: Boolean,
            default: !0
        },
        isSplit: {
            type: Boolean,
            default: !1
        },
        size: {
            type: String,
            default: "default"
        }
    },
    emits: ["cancel", "confirm"],
    setup(n, {emit: i}) {
        const r = n
          , o = ae(()=>Mt({
            slots: {
                base: "flex items-center gap-4",
                button: ""
            },
            variants: {
                align: {
                    center: "justify-center",
                    right: "justify-end"
                },
                direction: {
                    "row-reverse": {
                        base: "flex-row-reverse"
                    },
                    col: {
                        base: "flex-col",
                        button: "w-full"
                    },
                    "col-reverse": {
                        base: "flex-col-reverse",
                        button: "w-full"
                    }
                }
            },
            compoundSlots: [{
                slots: ["button"],
                direction: "row",
                isSplit: !1,
                class: "min-w-[96px]"
            }, {
                slots: ["button"],
                direction: "row-reverse",
                isSplit: !1,
                class: "min-w-[96px]"
            }, {
                slots: ["button"],
                direction: "row",
                isSplit: !0,
                class: "flex-1"
            }, {
                slots: ["button"],
                direction: "row-reverse",
                is: !0,
                class: "flex-1"
            }]
        })({
            align: r.align,
            direction: r.direction,
            isSplit: r.isSplit
        }))
          , s = ()=>{
            i("cancel")
        }
          , l = ()=>{
            i("confirm")
        }
        ;
        return (c,f)=>(Ee(),
        Ze("div", {
            class: $e([o.value.base({
                class: n.classes.base
            }), "bc-action-bar"])
        }, [n.hasCancelButton ? (Ee(),
        zn(Es, Nn({
            key: 0,
            class: [o.value.button({
                class: n.classes.button
            }), "bc-action-bar__button"]
        }, n.cancelButtonProps, {
            size: n.size,
            onClick: s
        }), {
            default: fn(()=>[Ta(Pr(n.cancelButtonText), 1)]),
            _: 1
        }, 16, ["class", "size"])) : ut("", !0), Tr(Es, Nn({
            class: [o.value.button({
                class: n.classes.button
            }), "bc-action-bar__button"]
        }, n.confirmButtonProps, {
            size: n.size,
            type: n.confirmButtonType,
            onClick: l
        }), {
            default: fn(()=>[Ta(Pr(n.confirmButtonText), 1)]),
            _: 1
        }, 16, ["class", "size", "type"])], 2))
    }
})
  , b_ = ["alt", "src"]
  , rw = Object.assign({
    name: "BcAvatar"
}, {
    __name: "index",
    props: {
        alt: {
            type: String
        },
        classes: {
            type: Object,
            default: ()=>({
                base: ""
            })
        },
        fit: {
            type: String,
            values: ["cover", "contain", "fill", "none", "scale-down"],
            default: "cover"
        },
        placeholder: {
            type: String
        },
        shape: {
            type: String,
            values: ["circle", "square"],
            default: "circle"
        },
        size: {
            type: [String, Number],
            default: "default"
        },
        src: {
            type: String
        }
    },
    setup(n) {
        const i = n
          , r = Se("")
          , o = Se(!0)
          , s = Se(!1);
        ur(()=>{
            r.value = i.src || i.placeholder
        }
        );
        const l = ae(()=>{
            let g = "";
            return vn.isNumber(i.size) ? g = `${i.size}px` : g = i.size === "default" ? "var(--bc-avatar-size)" : `var(--bc-avatar-size-${i.size})`,
            {
                width: g,
                height: g
            }
        }
        )
          , c = ae(()=>Mt({
            slots: {
                base: "shrink-0 overflow-hidden bg-base"
            },
            variants: {
                fit: {
                    cover: "object-cover",
                    contain: "object-contain",
                    fill: "object-fill",
                    none: "object-none",
                    "scale-down": "object-scale-down"
                },
                shape: {
                    circle: "rounded-full",
                    square: "rounded-base"
                }
            }
        })({
            fit: i.fit,
            shape: i.shape
        }))
          , f = g=>{
            o.value = !1
        }
          , v = g=>{
            o.value = !1,
            s.value = !0
        }
        ;
        return (g,y)=>r.value && !s.value ? (Ee(),
        Ze("img", {
            key: 0,
            alt: n.alt,
            class: $e([c.value.base({
                class: n.classes.base
            }), "bc-avatar"]),
            src: r.value,
            style: Cr(l.value),
            onError: v,
            onLoad: f
        }, null, 46, b_)) : (Ee(),
        Ze("div", {
            key: 1,
            class: $e([c.value.base({
                class: n.classes.base
            }), "bc-avatar"]),
            style: Cr(l.value)
        }, null, 6))
    }
});
var ad = {
    exports: {}
};
(function(n, i) {
    (function(r, o) {
        n.exports = o()
    }
    )(Pn, function() {
        var r = 1e3
          , o = 6e4
          , s = 36e5
          , l = "millisecond"
          , c = "second"
          , f = "minute"
          , v = "hour"
          , g = "day"
          , y = "week"
          , O = "month"
          , N = "quarter"
          , k = "year"
          , w = "date"
          , P = "Invalid Date"
          , S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
          , Z = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
          , I = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            ordinal: function(D) {
                var E = ["th", "st", "nd", "rd"]
                  , C = D % 100;
                return "[" + D + (E[(C - 20) % 10] || E[C] || E[0]) + "]"
            }
        }
          , j = function(D, E, C) {
            var F = String(D);
            return !F || F.length >= E ? D : "" + Array(E + 1 - F.length).join(C) + D
        }
          , H = {
            s: j,
            z: function(D) {
                var E = -D.utcOffset()
                  , C = Math.abs(E)
                  , F = Math.floor(C / 60)
                  , B = C % 60;
                return (E <= 0 ? "+" : "-") + j(F, 2, "0") + ":" + j(B, 2, "0")
            },
            m: function D(E, C) {
                if (E.date() < C.date())
                    return -D(C, E);
                var F = 12 * (C.year() - E.year()) + (C.month() - E.month())
                  , B = E.clone().add(F, O)
                  , K = C - B < 0
                  , te = E.clone().add(F + (K ? -1 : 1), O);
                return +(-(F + (C - B) / (K ? B - te : te - B)) || 0)
            },
            a: function(D) {
                return D < 0 ? Math.ceil(D) || 0 : Math.floor(D)
            },
            p: function(D) {
                return {
                    M: O,
                    y: k,
                    w: y,
                    d: g,
                    D: w,
                    h: v,
                    m: f,
                    s: c,
                    ms: l,
                    Q: N
                }[D] || String(D || "").toLowerCase().replace(/s$/, "")
            },
            u: function(D) {
                return D === void 0
            }
        }
          , W = "en"
          , V = {};
        V[W] = I;
        var T = function(D) {
            return D instanceof Y
        }
          , L = function D(E, C, F) {
            var B;
            if (!E)
                return W;
            if (typeof E == "string") {
                var K = E.toLowerCase();
                V[K] && (B = K),
                C && (V[K] = C,
                B = K);
                var te = E.split("-");
                if (!B && te.length > 1)
                    return D(te[0])
            } else {
                var me = E.name;
                V[me] = E,
                B = me
            }
            return !F && B && (W = B),
            B || !F && W
        }
          , Q = function(D, E) {
            if (T(D))
                return D.clone();
            var C = typeof E == "object" ? E : {};
            return C.date = D,
            C.args = arguments,
            new Y(C)
        }
          , ne = H;
        ne.l = L,
        ne.i = T,
        ne.w = function(D, E) {
            return Q(D, {
                locale: E.$L,
                utc: E.$u,
                x: E.$x,
                $offset: E.$offset
            })
        }
        ;
        var Y = function() {
            function D(C) {
                this.$L = L(C.locale, null, !0),
                this.parse(C)
            }
            var E = D.prototype;
            return E.parse = function(C) {
                this.$d = function(F) {
                    var B = F.date
                      , K = F.utc;
                    if (B === null)
                        return new Date(NaN);
                    if (ne.u(B))
                        return new Date;
                    if (B instanceof Date)
                        return new Date(B);
                    if (typeof B == "string" && !/Z$/i.test(B)) {
                        var te = B.match(S);
                        if (te) {
                            var me = te[2] - 1 || 0
                              , ce = (te[7] || "0").substring(0, 3);
                            return K ? new Date(Date.UTC(te[1], me, te[3] || 1, te[4] || 0, te[5] || 0, te[6] || 0, ce)) : new Date(te[1],me,te[3] || 1,te[4] || 0,te[5] || 0,te[6] || 0,ce)
                        }
                    }
                    return new Date(B)
                }(C),
                this.$x = C.x || {},
                this.init()
            }
            ,
            E.init = function() {
                var C = this.$d;
                this.$y = C.getFullYear(),
                this.$M = C.getMonth(),
                this.$D = C.getDate(),
                this.$W = C.getDay(),
                this.$H = C.getHours(),
                this.$m = C.getMinutes(),
                this.$s = C.getSeconds(),
                this.$ms = C.getMilliseconds()
            }
            ,
            E.$utils = function() {
                return ne
            }
            ,
            E.isValid = function() {
                return this.$d.toString() !== P
            }
            ,
            E.isSame = function(C, F) {
                var B = Q(C);
                return this.startOf(F) <= B && B <= this.endOf(F)
            }
            ,
            E.isAfter = function(C, F) {
                return Q(C) < this.startOf(F)
            }
            ,
            E.isBefore = function(C, F) {
                return this.endOf(F) < Q(C)
            }
            ,
            E.$g = function(C, F, B) {
                return ne.u(C) ? this[F] : this.set(B, C)
            }
            ,
            E.unix = function() {
                return Math.floor(this.valueOf() / 1e3)
            }
            ,
            E.valueOf = function() {
                return this.$d.getTime()
            }
            ,
            E.startOf = function(C, F) {
                var B = this
                  , K = !!ne.u(F) || F
                  , te = ne.p(C)
                  , me = function(ht, Ue) {
                    var Ut = ne.w(B.$u ? Date.UTC(B.$y, Ue, ht) : new Date(B.$y,Ue,ht), B);
                    return K ? Ut : Ut.endOf(g)
                }
                  , ce = function(ht, Ue) {
                    return ne.w(B.toDate()[ht].apply(B.toDate("s"), (K ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Ue)), B)
                }
                  , Ce = this.$W
                  , Re = this.$M
                  , Xe = this.$D
                  , rt = "set" + (this.$u ? "UTC" : "");
                switch (te) {
                case k:
                    return K ? me(1, 0) : me(31, 11);
                case O:
                    return K ? me(1, Re) : me(0, Re + 1);
                case y:
                    var wt = this.$locale().weekStart || 0
                      , Wn = (Ce < wt ? Ce + 7 : Ce) - wt;
                    return me(K ? Xe - Wn : Xe + (6 - Wn), Re);
                case g:
                case w:
                    return ce(rt + "Hours", 0);
                case v:
                    return ce(rt + "Minutes", 1);
                case f:
                    return ce(rt + "Seconds", 2);
                case c:
                    return ce(rt + "Milliseconds", 3);
                default:
                    return this.clone()
                }
            }
            ,
            E.endOf = function(C) {
                return this.startOf(C, !1)
            }
            ,
            E.$set = function(C, F) {
                var B, K = ne.p(C), te = "set" + (this.$u ? "UTC" : ""), me = (B = {},
                B[g] = te + "Date",
                B[w] = te + "Date",
                B[O] = te + "Month",
                B[k] = te + "FullYear",
                B[v] = te + "Hours",
                B[f] = te + "Minutes",
                B[c] = te + "Seconds",
                B[l] = te + "Milliseconds",
                B)[K], ce = K === g ? this.$D + (F - this.$W) : F;
                if (K === O || K === k) {
                    var Ce = this.clone().set(w, 1);
                    Ce.$d[me](ce),
                    Ce.init(),
                    this.$d = Ce.set(w, Math.min(this.$D, Ce.daysInMonth())).$d
                } else
                    me && this.$d[me](ce);
                return this.init(),
                this
            }
            ,
            E.set = function(C, F) {
                return this.clone().$set(C, F)
            }
            ,
            E.get = function(C) {
                return this[ne.p(C)]()
            }
            ,
            E.add = function(C, F) {
                var B, K = this;
                C = Number(C);
                var te = ne.p(F)
                  , me = function(Re) {
                    var Xe = Q(K);
                    return ne.w(Xe.date(Xe.date() + Math.round(Re * C)), K)
                };
                if (te === O)
                    return this.set(O, this.$M + C);
                if (te === k)
                    return this.set(k, this.$y + C);
                if (te === g)
                    return me(1);
                if (te === y)
                    return me(7);
                var ce = (B = {},
                B[f] = o,
                B[v] = s,
                B[c] = r,
                B)[te] || 1
                  , Ce = this.$d.getTime() + C * ce;
                return ne.w(Ce, this)
            }
            ,
            E.subtract = function(C, F) {
                return this.add(-1 * C, F)
            }
            ,
            E.format = function(C) {
                var F = this
                  , B = this.$locale();
                if (!this.isValid())
                    return B.invalidDate || P;
                var K = C || "YYYY-MM-DDTHH:mm:ssZ"
                  , te = ne.z(this)
                  , me = this.$H
                  , ce = this.$m
                  , Ce = this.$M
                  , Re = B.weekdays
                  , Xe = B.months
                  , rt = B.meridiem
                  , wt = function(Ue, Ut, qt, en) {
                    return Ue && (Ue[Ut] || Ue(F, K)) || qt[Ut].slice(0, en)
                }
                  , Wn = function(Ue) {
                    return ne.s(me % 12 || 12, Ue, "0")
                }
                  , ht = rt || function(Ue, Ut, qt) {
                    var en = Ue < 12 ? "AM" : "PM";
                    return qt ? en.toLowerCase() : en
                }
                ;
                return K.replace(Z, function(Ue, Ut) {
                    return Ut || function(qt) {
                        switch (qt) {
                        case "YY":
                            return String(F.$y).slice(-2);
                        case "YYYY":
                            return ne.s(F.$y, 4, "0");
                        case "M":
                            return Ce + 1;
                        case "MM":
                            return ne.s(Ce + 1, 2, "0");
                        case "MMM":
                            return wt(B.monthsShort, Ce, Xe, 3);
                        case "MMMM":
                            return wt(Xe, Ce);
                        case "D":
                            return F.$D;
                        case "DD":
                            return ne.s(F.$D, 2, "0");
                        case "d":
                            return String(F.$W);
                        case "dd":
                            return wt(B.weekdaysMin, F.$W, Re, 2);
                        case "ddd":
                            return wt(B.weekdaysShort, F.$W, Re, 3);
                        case "dddd":
                            return Re[F.$W];
                        case "H":
                            return String(me);
                        case "HH":
                            return ne.s(me, 2, "0");
                        case "h":
                            return Wn(1);
                        case "hh":
                            return Wn(2);
                        case "a":
                            return ht(me, ce, !0);
                        case "A":
                            return ht(me, ce, !1);
                        case "m":
                            return String(ce);
                        case "mm":
                            return ne.s(ce, 2, "0");
                        case "s":
                            return String(F.$s);
                        case "ss":
                            return ne.s(F.$s, 2, "0");
                        case "SSS":
                            return ne.s(F.$ms, 3, "0");
                        case "Z":
                            return te
                        }
                        return null
                    }(Ue) || te.replace(":", "")
                })
            }
            ,
            E.utcOffset = function() {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
            }
            ,
            E.diff = function(C, F, B) {
                var K, te = this, me = ne.p(F), ce = Q(C), Ce = (ce.utcOffset() - this.utcOffset()) * o, Re = this - ce, Xe = function() {
                    return ne.m(te, ce)
                };
                switch (me) {
                case k:
                    K = Xe() / 12;
                    break;
                case O:
                    K = Xe();
                    break;
                case N:
                    K = Xe() / 3;
                    break;
                case y:
                    K = (Re - Ce) / 6048e5;
                    break;
                case g:
                    K = (Re - Ce) / 864e5;
                    break;
                case v:
                    K = Re / s;
                    break;
                case f:
                    K = Re / o;
                    break;
                case c:
                    K = Re / r;
                    break;
                default:
                    K = Re
                }
                return B ? K : ne.a(K)
            }
            ,
            E.daysInMonth = function() {
                return this.endOf(O).$D
            }
            ,
            E.$locale = function() {
                return V[this.$L]
            }
            ,
            E.locale = function(C, F) {
                if (!C)
                    return this.$L;
                var B = this.clone()
                  , K = L(C, F, !0);
                return K && (B.$L = K),
                B
            }
            ,
            E.clone = function() {
                return ne.w(this.$d, this)
            }
            ,
            E.toDate = function() {
                return new Date(this.valueOf())
            }
            ,
            E.toJSON = function() {
                return this.isValid() ? this.toISOString() : null
            }
            ,
            E.toISOString = function() {
                return this.$d.toISOString()
            }
            ,
            E.toString = function() {
                return this.$d.toUTCString()
            }
            ,
            D
        }()
          , U = Y.prototype;
        return Q.prototype = U,
        [["$ms", l], ["$s", c], ["$m", f], ["$H", v], ["$W", g], ["$M", O], ["$y", k], ["$D", w]].forEach(function(D) {
            U[D[1]] = function(E) {
                return this.$g(E, D[0], D[1])
            }
        }),
        Q.extend = function(D, E) {
            return D.$i || (D(E, Y, Q),
            D.$i = !0),
            Q
        }
        ,
        Q.locale = L,
        Q.isDayjs = T,
        Q.unix = function(D) {
            return Q(1e3 * D)
        }
        ,
        Q.en = V[W],
        Q.Ls = V,
        Q.p = {},
        Q
    })
}
)(ad);
var __ = ad.exports;
const od = Ws(__)
  , As = (n,i="px",r="suffix")=>vn.isNumber(n) ? i === "px" ? `${n}${i}` : i === "$" ? `${i}${n}` : r === "prefix" ? `${i}${n}` : `${n}${i}` : n
  , x_ = Ct("i", {
    class: "ri-skip-up-line"
}, null, -1)
  , iw = Object.assign({
    name: "BcBackTop"
}, {
    __name: "index",
    props: {
        bottom: {
            type: [Number, String],
            default: 50
        },
        classes: {
            type: Object,
            default: ()=>({
                base: ""
            })
        },
        color: {
            type: String,
            values: ["default"],
            default: "default"
        },
        right: {
            type: [Number, String],
            default: 25
        },
        round: {
            type: Boolean,
            default: !1
        }
    },
    setup(n) {
        const i = n
          , r = Se(!1)
          , o = ae(()=>({
            bottom: As(i.bottom),
            right: As(i.right)
        }))
          , s = ae(()=>Mt({
            slots: {
                base: "fixed flex h-10 w-10 cursor-pointer items-center justify-center text-xl transition"
            },
            variants: {
                color: {
                    default: {
                        base: "bg-black/50 text-white hover:bg-black/60"
                    }
                },
                round: {
                    true: "rounded-full",
                    false: "rounded-base"
                }
            }
        })({
            color: i.color,
            round: i.round
        }));
        ur(()=>{
            window.addEventListener("scroll", l)
        }
        ),
        Zs(()=>{
            window.removeEventListener("scroll", l)
        }
        );
        const l = ()=>{
            r.value = window.scrollY > 500
        }
          , c = ()=>{
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        ;
        return (f,v)=>r.value ? (Ee(),
        Ze("div", {
            key: 0,
            class: $e([s.value.base({
                class: n.classes.base
            }), "bc-back-top"]),
            style: Cr(o.value),
            onClick: c
        }, [qe(f.$slots, "default", {}, ()=>[x_])], 6)) : ut("", !0)
    }
})
  , si = new Map;
function sd(n) {
    const i = Hc();
    function r(f) {
        var v;
        const g = si.get(n) || new Set;
        g.add(f),
        si.set(n, g);
        const y = ()=>s(f);
        return (v = i == null ? void 0 : i.cleanups) == null || v.push(y),
        y
    }
    function o(f) {
        function v(...g) {
            s(v),
            f(...g)
        }
        return r(v)
    }
    function s(f) {
        const v = si.get(n);
        v && (v.delete(f),
        v.size || l())
    }
    function l() {
        si.delete(n)
    }
    function c(f, v) {
        var g;
        (g = si.get(n)) == null || g.forEach(y=>y(f, v))
    }
    return {
        on: r,
        once: o,
        off: s,
        emit: c,
        reset: l
    }
}
function ud(n) {
    const i = sd("form-event")
      , r = Bn("formContext", void 0)
      , o = Bn("formItem", void 0)
      , s = ae(()=>(r == null ? void 0 : r.size) || n.size)
      , l = ae(()=>(o == null ? void 0 : o.hasError.value) || !1);
    return {
        formContext: r,
        formSize: s,
        formItem: o,
        isError: l,
        emitFormEvent: c=>{
            o && i.emit({
                trigger: c,
                prop: o.prop,
                relatedProps: o.relatedProps
            })
        }
    }
}
var ci = new Map;
function w_(n) {
    var i = ci.get(n);
    i && i.destroy()
}
function k_(n) {
    var i = ci.get(n);
    i && i.update()
}
var li = null;
typeof window > "u" ? ((li = function(n) {
    return n
}
).destroy = function(n) {
    return n
}
,
li.update = function(n) {
    return n
}
) : ((li = function(n, i) {
    return n && Array.prototype.forEach.call(n.length ? n : [n], function(r) {
        return function(o) {
            if (o && o.nodeName && o.nodeName === "TEXTAREA" && !ci.has(o)) {
                var s, l = null, c = window.getComputedStyle(o), f = (s = o.value,
                function() {
                    g({
                        testForHeightReduction: s === "" || !o.value.startsWith(s),
                        restoreTextAlign: null
                    }),
                    s = o.value
                }
                ), v = (function(O) {
                    o.removeEventListener("autosize:destroy", v),
                    o.removeEventListener("autosize:update", y),
                    o.removeEventListener("input", f),
                    window.removeEventListener("resize", y),
                    Object.keys(O).forEach(function(N) {
                        return o.style[N] = O[N]
                    }),
                    ci.delete(o)
                }
                ).bind(o, {
                    height: o.style.height,
                    resize: o.style.resize,
                    textAlign: o.style.textAlign,
                    overflowY: o.style.overflowY,
                    overflowX: o.style.overflowX,
                    wordWrap: o.style.wordWrap
                });
                o.addEventListener("autosize:destroy", v),
                o.addEventListener("autosize:update", y),
                o.addEventListener("input", f),
                window.addEventListener("resize", y),
                o.style.overflowX = "hidden",
                o.style.wordWrap = "break-word",
                ci.set(o, {
                    destroy: v,
                    update: y
                }),
                y()
            }
            function g(O) {
                var N, k, w = O.restoreTextAlign, P = w === void 0 ? null : w, S = O.testForHeightReduction, Z = S === void 0 || S, I = c.overflowY;
                if (o.scrollHeight !== 0 && (c.resize === "vertical" ? o.style.resize = "none" : c.resize === "both" && (o.style.resize = "horizontal"),
                Z && (N = function(H) {
                    for (var W = []; H && H.parentNode && H.parentNode instanceof Element; )
                        H.parentNode.scrollTop && W.push([H.parentNode, H.parentNode.scrollTop]),
                        H = H.parentNode;
                    return function() {
                        return W.forEach(function(V) {
                            var T = V[0]
                              , L = V[1];
                            T.style.scrollBehavior = "auto",
                            T.scrollTop = L,
                            T.style.scrollBehavior = null
                        })
                    }
                }(o),
                o.style.height = ""),
                k = c.boxSizing === "content-box" ? o.scrollHeight - (parseFloat(c.paddingTop) + parseFloat(c.paddingBottom)) : o.scrollHeight + parseFloat(c.borderTopWidth) + parseFloat(c.borderBottomWidth),
                c.maxHeight !== "none" && k > parseFloat(c.maxHeight) ? (c.overflowY === "hidden" && (o.style.overflow = "scroll"),
                k = parseFloat(c.maxHeight)) : c.overflowY !== "hidden" && (o.style.overflow = "hidden"),
                o.style.height = k + "px",
                P && (o.style.textAlign = P),
                N && N(),
                l !== k && (o.dispatchEvent(new Event("autosize:resized",{
                    bubbles: !0
                })),
                l = k),
                I !== c.overflow && !P)) {
                    var j = c.textAlign;
                    c.overflow === "hidden" && (o.style.textAlign = j === "start" ? "end" : "start"),
                    g({
                        restoreTextAlign: j,
                        testForHeightReduction: !0
                    })
                }
            }
            function y() {
                g({
                    testForHeightReduction: !0,
                    restoreTextAlign: null
                })
            }
        }(r)
    }),
    n
}
).destroy = function(n) {
    return n && Array.prototype.forEach.call(n.length ? n : [n], w_),
    n
}
,
li.update = function(n) {
    return n && Array.prototype.forEach.call(n.length ? n : [n], k_),
    n
}
);
var S_ = li;
const O_ = ["disabled", "readonly", "rows", "onKeyup"]
  , aw = Object.assign({
    name: "BcTextarea",
    inheritAttrs: !1
}, {
    __name: "index",
    props: {
        autosize: {
            type: Boolean,
            default: !0
        },
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                inner: ""
            })
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        maxRows: {
            type: Number,
            default: 1 / 0
        },
        modelValue: {
            type: String,
            default: ""
        },
        readonly: {
            type: Boolean,
            default: !1
        },
        resize: {
            type: String,
            values: ["none", "both", "horizontal", "vertical"],
            default: "none"
        },
        rows: {
            type: Number
        },
        size: {
            type: String,
            values: ["default", "xlarge"],
            default: "default"
        },
        variant: {
            type: String,
            values: ["default", "variant1"],
            default: "default"
        }
    },
    emits: ["blur", "change", "enter", "focus", "input", "keydown", "update:modelValue"],
    setup(n, {emit: i}) {
        const r = n
          , o = Se(null)
          , s = Se(null)
          , {isError: l, emitFormEvent: c} = ud(r)
          , f = ae({
            get() {
                return r.modelValue
            },
            set(S) {
                i("update:modelValue", S)
            }
        });
        ur(()=>{
            if (r.autosize) {
                if (vn.isFinite(r.maxRows)) {
                    const S = window.getComputedStyle(o.value)
                      , Z = parseFloat(S.lineHeight)
                      , I = parseFloat(S.paddingTop) + parseFloat(S.paddingBottom);
                    s.value = Z * r.maxRows + I
                }
                S_(o.value)
            }
        }
        );
        const v = ae(()=>{
            const S = {
                resize: r.resize
            };
            return s.value && (S.maxHeight = `${s.value}px`),
            S
        }
        )
          , g = ae(()=>Mt({
            slots: {
                base: "flex w-full items-center overflow-hidden rounded-base transition",
                inner: "h-full w-full border-0 text-strong placeholder:text-placeholder"
            },
            variants: {
                disabled: {
                    true: "cursor-not-allowed bg-base"
                },
                size: {
                    default: {
                        inner: "px-3 py-[9px] text-sm"
                    },
                    xlarge: {
                        inner: "text-md px-4 py-[11px]"
                    }
                },
                variant: {
                    default: {
                        base: "border border-base bg-white"
                    },
                    variant1: {
                        base: "border border-gray-300 bg-white shadow-sm"
                    }
                }
            },
            compoundVariants: [{
                readonly: !1,
                disabled: !1,
                variant: "default",
                class: "focus-within:border-primary"
            }, {
                readonly: !1,
                disabled: !1,
                variant: "variant1",
                class: "focus-within:border-primary focus-within:ring focus-within:ring-primary-light"
            }, {
                isError: !0,
                class: "border-danger focus-within:border-danger"
            }]
        })({
            disabled: r.disabled,
            isError: l.value,
            readonly: r.readonly,
            size: r.size,
            variant: r.variant
        }))
          , y = S=>{
            i("blur", S),
            c("blur")
        }
          , O = S=>{
            i("change", S.target.value)
        }
          , N = S=>{
            i("enter", S)
        }
          , k = S=>{
            i("focus", S)
        }
          , w = S=>{
            i("keydown", S)
        }
          , P = S=>{
            i("input", S.target.value)
        }
        ;
        return (S,Z)=>(Ee(),
        Ze("div", {
            class: $e([g.value.base({
                class: n.classes.base
            }), "bc-textarea", S.$attrs.class])
        }, [Uc(Ct("textarea", Nn({
            ref_key: "textareaRef",
            ref: o,
            "onUpdate:modelValue": Z[0] || (Z[0] = I=>f.value = I),
            class: [g.value.inner({
                class: n.classes.inner
            }), "bc-textarea__inner"]
        }, Ge(vn.omit)(S.$attrs, ["class", "style"]), {
            disabled: n.disabled,
            readonly: n.readonly,
            rows: n.rows,
            style: v.value,
            onBlur: y,
            onChange: O,
            onFocus: k,
            onInput: P,
            onKeydown: w,
            onKeyup: qc(N, ["enter"])
        }), null, 16, O_), [[Sb, f.value]])], 2))
    }
})
  , ow = Object.assign({
    name: "BcContainer"
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                main: "",
                aside: ""
            })
        },
        responsiveStyling: {
            type: Boolean,
            default: !1
        },
        reverse: {
            type: Boolean,
            default: !1
        }
    },
    setup(n) {
        const i = n
          , r = ae(()=>Mt({
            slots: {
                base: "flex",
                main: "",
                aside: ""
            },
            variants: {
                responsiveStyling: {
                    true: {
                        base: "flex-col md:flex-row md:justify-between md:gap-8",
                        main: "md:min-w-0 md:flex-1",
                        aside: "w-full md:w-80"
                    },
                    false: {
                        base: "justify-between",
                        main: "min-w-0 flex-1",
                        aside: "w-80"
                    }
                }
            },
            compoundVariants: [{
                reverse: !0,
                responsiveStyling: !0,
                class: "flex-col-reverse md:flex-row-reverse"
            }, {
                reverse: !0,
                responsiveStyling: !1,
                class: "flex-row-reverse"
            }]
        })({
            responsiveStyling: i.responsiveStyling,
            reverse: i.reverse
        }));
        return (o,s)=>(Ee(),
        Ze("div", {
            class: $e([r.value.base({
                class: n.classes.base
            }), "bc-container"])
        }, [Ct("div", {
            class: $e(r.value.main({
                class: n.classes.main
            }))
        }, [qe(o.$slots, "default")], 2), Ct("aside", {
            class: $e(r.value.aside({
                class: n.classes.aside
            }))
        }, [qe(o.$slots, "aside")], 2)], 2))
    }
});
var ld = {
    exports: {}
};
(function(n, i) {
    (function(r, o) {
        n.exports = o()
    }
    )(Pn, function() {
        var r, o, s = 1e3, l = 6e4, c = 36e5, f = 864e5, v = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = 31536e6, y = 2592e6, O = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, N = {
            years: g,
            months: y,
            days: f,
            hours: c,
            minutes: l,
            seconds: s,
            milliseconds: 1,
            weeks: 6048e5
        }, k = function(V) {
            return V instanceof H
        }, w = function(V, T, L) {
            return new H(V,L,T.$l)
        }, P = function(V) {
            return o.p(V) + "s"
        }, S = function(V) {
            return V < 0
        }, Z = function(V) {
            return S(V) ? Math.ceil(V) : Math.floor(V)
        }, I = function(V) {
            return Math.abs(V)
        }, j = function(V, T) {
            return V ? S(V) ? {
                negative: !0,
                format: "" + I(V) + T
            } : {
                negative: !1,
                format: "" + V + T
            } : {
                negative: !1,
                format: ""
            }
        }, H = function() {
            function V(L, Q, ne) {
                var Y = this;
                if (this.$d = {},
                this.$l = ne,
                L === void 0 && (this.$ms = 0,
                this.parseFromMilliseconds()),
                Q)
                    return w(L * N[P(Q)], this);
                if (typeof L == "number")
                    return this.$ms = L,
                    this.parseFromMilliseconds(),
                    this;
                if (typeof L == "object")
                    return Object.keys(L).forEach(function(E) {
                        Y.$d[P(E)] = L[E]
                    }),
                    this.calMilliseconds(),
                    this;
                if (typeof L == "string") {
                    var U = L.match(O);
                    if (U) {
                        var D = U.slice(2).map(function(E) {
                            return E != null ? Number(E) : 0
                        });
                        return this.$d.years = D[0],
                        this.$d.months = D[1],
                        this.$d.weeks = D[2],
                        this.$d.days = D[3],
                        this.$d.hours = D[4],
                        this.$d.minutes = D[5],
                        this.$d.seconds = D[6],
                        this.calMilliseconds(),
                        this
                    }
                }
                return this
            }
            var T = V.prototype;
            return T.calMilliseconds = function() {
                var L = this;
                this.$ms = Object.keys(this.$d).reduce(function(Q, ne) {
                    return Q + (L.$d[ne] || 0) * N[ne]
                }, 0)
            }
            ,
            T.parseFromMilliseconds = function() {
                var L = this.$ms;
                this.$d.years = Z(L / g),
                L %= g,
                this.$d.months = Z(L / y),
                L %= y,
                this.$d.days = Z(L / f),
                L %= f,
                this.$d.hours = Z(L / c),
                L %= c,
                this.$d.minutes = Z(L / l),
                L %= l,
                this.$d.seconds = Z(L / s),
                L %= s,
                this.$d.milliseconds = L
            }
            ,
            T.toISOString = function() {
                var L = j(this.$d.years, "Y")
                  , Q = j(this.$d.months, "M")
                  , ne = +this.$d.days || 0;
                this.$d.weeks && (ne += 7 * this.$d.weeks);
                var Y = j(ne, "D")
                  , U = j(this.$d.hours, "H")
                  , D = j(this.$d.minutes, "M")
                  , E = this.$d.seconds || 0;
                this.$d.milliseconds && (E += this.$d.milliseconds / 1e3);
                var C = j(E, "S")
                  , F = L.negative || Q.negative || Y.negative || U.negative || D.negative || C.negative
                  , B = U.format || D.format || C.format ? "T" : ""
                  , K = (F ? "-" : "") + "P" + L.format + Q.format + Y.format + B + U.format + D.format + C.format;
                return K === "P" || K === "-P" ? "P0D" : K
            }
            ,
            T.toJSON = function() {
                return this.toISOString()
            }
            ,
            T.format = function(L) {
                var Q = L || "YYYY-MM-DDTHH:mm:ss"
                  , ne = {
                    Y: this.$d.years,
                    YY: o.s(this.$d.years, 2, "0"),
                    YYYY: o.s(this.$d.years, 4, "0"),
                    M: this.$d.months,
                    MM: o.s(this.$d.months, 2, "0"),
                    D: this.$d.days,
                    DD: o.s(this.$d.days, 2, "0"),
                    H: this.$d.hours,
                    HH: o.s(this.$d.hours, 2, "0"),
                    m: this.$d.minutes,
                    mm: o.s(this.$d.minutes, 2, "0"),
                    s: this.$d.seconds,
                    ss: o.s(this.$d.seconds, 2, "0"),
                    SSS: o.s(this.$d.milliseconds, 3, "0")
                };
                return Q.replace(v, function(Y, U) {
                    return U || String(ne[Y])
                })
            }
            ,
            T.as = function(L) {
                return this.$ms / N[P(L)]
            }
            ,
            T.get = function(L) {
                var Q = this.$ms
                  , ne = P(L);
                return ne === "milliseconds" ? Q %= 1e3 : Q = ne === "weeks" ? Z(Q / N[ne]) : this.$d[ne],
                Q === 0 ? 0 : Q
            }
            ,
            T.add = function(L, Q, ne) {
                var Y;
                return Y = Q ? L * N[P(Q)] : k(L) ? L.$ms : w(L, this).$ms,
                w(this.$ms + Y * (ne ? -1 : 1), this)
            }
            ,
            T.subtract = function(L, Q) {
                return this.add(L, Q, !0)
            }
            ,
            T.locale = function(L) {
                var Q = this.clone();
                return Q.$l = L,
                Q
            }
            ,
            T.clone = function() {
                return w(this.$ms, this)
            }
            ,
            T.humanize = function(L) {
                return r().add(this.$ms, "ms").locale(this.$l).fromNow(!L)
            }
            ,
            T.valueOf = function() {
                return this.asMilliseconds()
            }
            ,
            T.milliseconds = function() {
                return this.get("milliseconds")
            }
            ,
            T.asMilliseconds = function() {
                return this.as("milliseconds")
            }
            ,
            T.seconds = function() {
                return this.get("seconds")
            }
            ,
            T.asSeconds = function() {
                return this.as("seconds")
            }
            ,
            T.minutes = function() {
                return this.get("minutes")
            }
            ,
            T.asMinutes = function() {
                return this.as("minutes")
            }
            ,
            T.hours = function() {
                return this.get("hours")
            }
            ,
            T.asHours = function() {
                return this.as("hours")
            }
            ,
            T.days = function() {
                return this.get("days")
            }
            ,
            T.asDays = function() {
                return this.as("days")
            }
            ,
            T.weeks = function() {
                return this.get("weeks")
            }
            ,
            T.asWeeks = function() {
                return this.as("weeks")
            }
            ,
            T.months = function() {
                return this.get("months")
            }
            ,
            T.asMonths = function() {
                return this.as("months")
            }
            ,
            T.years = function() {
                return this.get("years")
            }
            ,
            T.asYears = function() {
                return this.as("years")
            }
            ,
            V
        }(), W = function(V, T, L) {
            return V.add(T.years() * L, "y").add(T.months() * L, "M").add(T.days() * L, "d").add(T.hours() * L, "h").add(T.minutes() * L, "m").add(T.seconds() * L, "s").add(T.milliseconds() * L, "ms")
        };
        return function(V, T, L) {
            r = L,
            o = L().$utils(),
            L.duration = function(Y, U) {
                var D = L.locale();
                return w(Y, {
                    $l: D
                }, U)
            }
            ,
            L.isDuration = k;
            var Q = T.prototype.add
              , ne = T.prototype.subtract;
            T.prototype.add = function(Y, U) {
                return k(Y) ? W(this, Y, 1) : Q.bind(this)(Y, U)
            }
            ,
            T.prototype.subtract = function(Y, U) {
                return k(Y) ? W(this, Y, -1) : ne.bind(this)(Y, U)
            }
        }
    })
}
)(ld);
var $_ = ld.exports;
const T_ = Ws($_);
var cd = {
    exports: {}
};
(function(n, i) {
    (function(r, o) {
        n.exports = o()
    }
    )(Pn, function() {
        return function(r, o, s) {
            r = r || {};
            var l = o.prototype
              , c = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            };
            function f(g, y, O, N) {
                return l.fromToBase(g, y, O, N)
            }
            s.en.relativeTime = c,
            l.fromToBase = function(g, y, O, N, k) {
                for (var w, P, S, Z = O.$locale().relativeTime || c, I = r.thresholds || [{
                    l: "s",
                    r: 44,
                    d: "second"
                }, {
                    l: "m",
                    r: 89
                }, {
                    l: "mm",
                    r: 44,
                    d: "minute"
                }, {
                    l: "h",
                    r: 89
                }, {
                    l: "hh",
                    r: 21,
                    d: "hour"
                }, {
                    l: "d",
                    r: 35
                }, {
                    l: "dd",
                    r: 25,
                    d: "day"
                }, {
                    l: "M",
                    r: 45
                }, {
                    l: "MM",
                    r: 10,
                    d: "month"
                }, {
                    l: "y",
                    r: 17
                }, {
                    l: "yy",
                    d: "year"
                }], j = I.length, H = 0; H < j; H += 1) {
                    var W = I[H];
                    W.d && (w = N ? s(g).diff(O, W.d, !0) : O.diff(g, W.d, !0));
                    var V = (r.rounding || Math.round)(Math.abs(w));
                    if (S = w > 0,
                    V <= W.r || !W.r) {
                        V <= 1 && H > 0 && (W = I[H - 1]);
                        var T = Z[W.l];
                        k && (V = k("" + V)),
                        P = typeof T == "string" ? T.replace("%d", V) : T(V, y, W.l, S);
                        break
                    }
                }
                if (y)
                    return P;
                var L = S ? Z.future : Z.past;
                return typeof L == "function" ? L(P) : L.replace("%s", P)
            }
            ,
            l.to = function(g, y) {
                return f(g, y, this, !0)
            }
            ,
            l.from = function(g, y) {
                return f(g, y, this)
            }
            ;
            var v = function(g) {
                return g.$u ? s.utc() : s()
            };
            l.toNow = function(g) {
                return this.to(v(this), g)
            }
            ,
            l.fromNow = function(g) {
                return this.from(v(this), g)
            }
        }
    })
}
)(cd);
var j_ = cd.exports;
const E_ = Ws(j_);
od.extend(T_);
od.extend(E_);
var Te;
(function(n) {
    n.assertEqual = s=>s;
    function i(s) {}
    n.assertIs = i;
    function r(s) {
        throw new Error
    }
    n.assertNever = r,
    n.arrayToEnum = s=>{
        const l = {};
        for (const c of s)
            l[c] = c;
        return l
    }
    ,
    n.getValidEnumValues = s=>{
        const l = n.objectKeys(s).filter(f=>typeof s[s[f]] != "number")
          , c = {};
        for (const f of l)
            c[f] = s[f];
        return n.objectValues(c)
    }
    ,
    n.objectValues = s=>n.objectKeys(s).map(function(l) {
        return s[l]
    }),
    n.objectKeys = typeof Object.keys == "function" ? s=>Object.keys(s) : s=>{
        const l = [];
        for (const c in s)
            Object.prototype.hasOwnProperty.call(s, c) && l.push(c);
        return l
    }
    ,
    n.find = (s,l)=>{
        for (const c of s)
            if (l(c))
                return c
    }
    ,
    n.isInteger = typeof Number.isInteger == "function" ? s=>Number.isInteger(s) : s=>typeof s == "number" && isFinite(s) && Math.floor(s) === s;
    function o(s, l=" | ") {
        return s.map(c=>typeof c == "string" ? `'${c}'` : c).join(l)
    }
    n.joinValues = o,
    n.jsonStringifyReplacer = (s,l)=>typeof l == "bigint" ? l.toString() : l
}
)(Te || (Te = {}));
var Cs;
(function(n) {
    n.mergeShapes = (i,r)=>({
        ...i,
        ...r
    })
}
)(Cs || (Cs = {}));
const J = Te.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"])
  , Mn = n=>{
    switch (typeof n) {
    case "undefined":
        return J.undefined;
    case "string":
        return J.string;
    case "number":
        return isNaN(n) ? J.nan : J.number;
    case "boolean":
        return J.boolean;
    case "function":
        return J.function;
    case "bigint":
        return J.bigint;
    case "symbol":
        return J.symbol;
    case "object":
        return Array.isArray(n) ? J.array : n === null ? J.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? J.promise : typeof Map < "u" && n instanceof Map ? J.map : typeof Set < "u" && n instanceof Set ? J.set : typeof Date < "u" && n instanceof Date ? J.date : J.object;
    default:
        return J.unknown
    }
}
  , q = Te.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"])
  , A_ = n=>JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ft extends Error {
    constructor(i) {
        super(),
        this.issues = [],
        this.addIssue = o=>{
            this.issues = [...this.issues, o]
        }
        ,
        this.addIssues = (o=[])=>{
            this.issues = [...this.issues, ...o]
        }
        ;
        const r = new.target.prototype;
        Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r,
        this.name = "ZodError",
        this.issues = i
    }
    get errors() {
        return this.issues
    }
    format(i) {
        const r = i || function(l) {
            return l.message
        }
          , o = {
            _errors: []
        }
          , s = l=>{
            for (const c of l.issues)
                if (c.code === "invalid_union")
                    c.unionErrors.map(s);
                else if (c.code === "invalid_return_type")
                    s(c.returnTypeError);
                else if (c.code === "invalid_arguments")
                    s(c.argumentsError);
                else if (c.path.length === 0)
                    o._errors.push(r(c));
                else {
                    let f = o
                      , v = 0;
                    for (; v < c.path.length; ) {
                        const g = c.path[v];
                        v === c.path.length - 1 ? (f[g] = f[g] || {
                            _errors: []
                        },
                        f[g]._errors.push(r(c))) : f[g] = f[g] || {
                            _errors: []
                        },
                        f = f[g],
                        v++
                    }
                }
        }
        ;
        return s(this),
        o
    }
    toString() {
        return this.message
    }
    get message() {
        return JSON.stringify(this.issues, Te.jsonStringifyReplacer, 2)
    }
    get isEmpty() {
        return this.issues.length === 0
    }
    flatten(i=r=>r.message) {
        const r = {}
          , o = [];
        for (const s of this.issues)
            s.path.length > 0 ? (r[s.path[0]] = r[s.path[0]] || [],
            r[s.path[0]].push(i(s))) : o.push(i(s));
        return {
            formErrors: o,
            fieldErrors: r
        }
    }
    get formErrors() {
        return this.flatten()
    }
}
Ft.create = n=>new Ft(n);
const fi = (n,i)=>{
    let r;
    switch (n.code) {
    case q.invalid_type:
        n.received === J.undefined ? r = "Required" : r = `Expected ${n.expected}, received ${n.received}`;
        break;
    case q.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(n.expected, Te.jsonStringifyReplacer)}`;
        break;
    case q.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${Te.joinValues(n.keys, ", ")}`;
        break;
    case q.invalid_union:
        r = "Invalid input";
        break;
    case q.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${Te.joinValues(n.options)}`;
        break;
    case q.invalid_enum_value:
        r = `Invalid enum value. Expected ${Te.joinValues(n.options)}, received '${n.received}'`;
        break;
    case q.invalid_arguments:
        r = "Invalid function arguments";
        break;
    case q.invalid_return_type:
        r = "Invalid function return type";
        break;
    case q.invalid_date:
        r = "Invalid date";
        break;
    case q.invalid_string:
        typeof n.validation == "object" ? "includes"in n.validation ? (r = `Invalid input: must include "${n.validation.includes}"`,
        typeof n.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${n.validation.position}`)) : "startsWith"in n.validation ? r = `Invalid input: must start with "${n.validation.startsWith}"` : "endsWith"in n.validation ? r = `Invalid input: must end with "${n.validation.endsWith}"` : Te.assertNever(n.validation) : n.validation !== "regex" ? r = `Invalid ${n.validation}` : r = "Invalid";
        break;
    case q.too_small:
        n.type === "array" ? r = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} ${n.minimum} element(s)` : n.type === "string" ? r = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} ${n.minimum} character(s)` : n.type === "number" ? r = `Number must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${n.minimum}` : n.type === "date" ? r = `Date must be ${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(n.minimum))}` : r = "Invalid input";
        break;
    case q.too_big:
        n.type === "array" ? r = `Array must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} ${n.maximum} element(s)` : n.type === "string" ? r = `String must contain ${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} ${n.maximum} character(s)` : n.type === "number" ? r = `Number must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "bigint" ? r = `BigInt must be ${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} ${n.maximum}` : n.type === "date" ? r = `Date must be ${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(n.maximum))}` : r = "Invalid input";
        break;
    case q.custom:
        r = "Invalid input";
        break;
    case q.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
    case q.not_multiple_of:
        r = `Number must be a multiple of ${n.multipleOf}`;
        break;
    case q.not_finite:
        r = "Number must be finite";
        break;
    default:
        r = i.defaultError,
        Te.assertNever(n)
    }
    return {
        message: r
    }
}
;
let dd = fi;
function C_(n) {
    dd = n
}
function Ca() {
    return dd
}
const Pa = n=>{
    const {data: i, path: r, errorMaps: o, issueData: s} = n
      , l = [...r, ...s.path || []]
      , c = {
        ...s,
        path: l
    };
    let f = "";
    const v = o.filter(g=>!!g).slice().reverse();
    for (const g of v)
        f = g(c, {
            data: i,
            defaultError: f
        }).message;
    return {
        ...s,
        path: l,
        message: s.message || f
    }
}
  , P_ = [];
function ee(n, i) {
    const r = Pa({
        issueData: i,
        data: n.data,
        path: n.path,
        errorMaps: [n.common.contextualErrorMap, n.schemaErrorMap, Ca(), fi].filter(o=>!!o)
    });
    n.common.issues.push(r)
}
class nt {
    constructor() {
        this.value = "valid"
    }
    dirty() {
        this.value === "valid" && (this.value = "dirty")
    }
    abort() {
        this.value !== "aborted" && (this.value = "aborted")
    }
    static mergeArray(i, r) {
        const o = [];
        for (const s of r) {
            if (s.status === "aborted")
                return he;
            s.status === "dirty" && i.dirty(),
            o.push(s.value)
        }
        return {
            status: i.value,
            value: o
        }
    }
    static async mergeObjectAsync(i, r) {
        const o = [];
        for (const s of r)
            o.push({
                key: await s.key,
                value: await s.value
            });
        return nt.mergeObjectSync(i, o)
    }
    static mergeObjectSync(i, r) {
        const o = {};
        for (const s of r) {
            const {key: l, value: c} = s;
            if (l.status === "aborted" || c.status === "aborted")
                return he;
            l.status === "dirty" && i.dirty(),
            c.status === "dirty" && i.dirty(),
            l.value !== "__proto__" && (typeof c.value < "u" || s.alwaysSet) && (o[l.value] = c.value)
        }
        return {
            status: i.value,
            value: o
        }
    }
}
const he = Object.freeze({
    status: "aborted"
})
  , fd = n=>({
    status: "dirty",
    value: n
})
  , lt = n=>({
    status: "valid",
    value: n
})
  , Ps = n=>n.status === "aborted"
  , Ms = n=>n.status === "dirty"
  , pi = n=>n.status === "valid"
  , Ma = n=>typeof Promise < "u" && n instanceof Promise;
var ie;
(function(n) {
    n.errToObj = i=>typeof i == "string" ? {
        message: i
    } : i || {},
    n.toString = i=>typeof i == "string" ? i : i == null ? void 0 : i.message
}
)(ie || (ie = {}));
class Jt {
    constructor(i, r, o, s) {
        this._cachedPath = [],
        this.parent = i,
        this.data = r,
        this._path = o,
        this._key = s
    }
    get path() {
        return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
    }
}
const zc = (n,i)=>{
    if (pi(i))
        return {
            success: !0,
            data: i.value
        };
    if (!n.common.issues.length)
        throw new Error("Validation failed but no issues detected.");
    return {
        success: !1,
        get error() {
            if (this._error)
                return this._error;
            const r = new Ft(n.common.issues);
            return this._error = r,
            this._error
        }
    }
}
;
function ve(n) {
    if (!n)
        return {};
    const {errorMap: i, invalid_type_error: r, required_error: o, description: s} = n;
    if (i && (r || o))
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return i ? {
        errorMap: i,
        description: s
    } : {
        errorMap: (l,c)=>l.code !== "invalid_type" ? {
            message: c.defaultError
        } : typeof c.data > "u" ? {
            message: o ?? c.defaultError
        } : {
            message: r ?? c.defaultError
        },
        description: s
    }
}
class be {
    constructor(i) {
        this.spa = this.safeParseAsync,
        this._def = i,
        this.parse = this.parse.bind(this),
        this.safeParse = this.safeParse.bind(this),
        this.parseAsync = this.parseAsync.bind(this),
        this.safeParseAsync = this.safeParseAsync.bind(this),
        this.spa = this.spa.bind(this),
        this.refine = this.refine.bind(this),
        this.refinement = this.refinement.bind(this),
        this.superRefine = this.superRefine.bind(this),
        this.optional = this.optional.bind(this),
        this.nullable = this.nullable.bind(this),
        this.nullish = this.nullish.bind(this),
        this.array = this.array.bind(this),
        this.promise = this.promise.bind(this),
        this.or = this.or.bind(this),
        this.and = this.and.bind(this),
        this.transform = this.transform.bind(this),
        this.brand = this.brand.bind(this),
        this.default = this.default.bind(this),
        this.catch = this.catch.bind(this),
        this.describe = this.describe.bind(this),
        this.pipe = this.pipe.bind(this),
        this.readonly = this.readonly.bind(this),
        this.isNullable = this.isNullable.bind(this),
        this.isOptional = this.isOptional.bind(this)
    }
    get description() {
        return this._def.description
    }
    _getType(i) {
        return Mn(i.data)
    }
    _getOrReturnCtx(i, r) {
        return r || {
            common: i.parent.common,
            data: i.data,
            parsedType: Mn(i.data),
            schemaErrorMap: this._def.errorMap,
            path: i.path,
            parent: i.parent
        }
    }
    _processInputParams(i) {
        return {
            status: new nt,
            ctx: {
                common: i.parent.common,
                data: i.data,
                parsedType: Mn(i.data),
                schemaErrorMap: this._def.errorMap,
                path: i.path,
                parent: i.parent
            }
        }
    }
    _parseSync(i) {
        const r = this._parse(i);
        if (Ma(r))
            throw new Error("Synchronous parse encountered promise.");
        return r
    }
    _parseAsync(i) {
        const r = this._parse(i);
        return Promise.resolve(r)
    }
    parse(i, r) {
        const o = this.safeParse(i, r);
        if (o.success)
            return o.data;
        throw o.error
    }
    safeParse(i, r) {
        var o;
        const s = {
            common: {
                issues: [],
                async: (o = r == null ? void 0 : r.async) !== null && o !== void 0 ? o : !1,
                contextualErrorMap: r == null ? void 0 : r.errorMap
            },
            path: (r == null ? void 0 : r.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: i,
            parsedType: Mn(i)
        }
          , l = this._parseSync({
            data: i,
            path: s.path,
            parent: s
        });
        return zc(s, l)
    }
    async parseAsync(i, r) {
        const o = await this.safeParseAsync(i, r);
        if (o.success)
            return o.data;
        throw o.error
    }
    async safeParseAsync(i, r) {
        const o = {
            common: {
                issues: [],
                contextualErrorMap: r == null ? void 0 : r.errorMap,
                async: !0
            },
            path: (r == null ? void 0 : r.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: i,
            parsedType: Mn(i)
        }
          , s = this._parse({
            data: i,
            path: o.path,
            parent: o
        })
          , l = await (Ma(s) ? s : Promise.resolve(s));
        return zc(o, l)
    }
    refine(i, r) {
        const o = s=>typeof r == "string" || typeof r > "u" ? {
            message: r
        } : typeof r == "function" ? r(s) : r;
        return this._refinement((s,l)=>{
            const c = i(s)
              , f = ()=>l.addIssue({
                code: q.custom,
                ...o(s)
            });
            return typeof Promise < "u" && c instanceof Promise ? c.then(v=>v ? !0 : (f(),
            !1)) : c ? !0 : (f(),
            !1)
        }
        )
    }
    refinement(i, r) {
        return this._refinement((o,s)=>i(o) ? !0 : (s.addIssue(typeof r == "function" ? r(o, s) : r),
        !1))
    }
    _refinement(i) {
        return new Vt({
            schema: this,
            typeName: le.ZodEffects,
            effect: {
                type: "refinement",
                refinement: i
            }
        })
    }
    superRefine(i) {
        return this._refinement(i)
    }
    optional() {
        return gn.create(this, this._def)
    }
    nullable() {
        return ar.create(this, this._def)
    }
    nullish() {
        return this.nullable().optional()
    }
    array() {
        return Wt.create(this, this._def)
    }
    promise() {
        return Nr.create(this, this._def)
    }
    or(i) {
        return mi.create([this, i], this._def)
    }
    and(i) {
        return yi.create(this, i, this._def)
    }
    transform(i) {
        return new Vt({
            ...ve(this._def),
            schema: this,
            typeName: le.ZodEffects,
            effect: {
                type: "transform",
                transform: i
            }
        })
    }
    default(i) {
        const r = typeof i == "function" ? i : ()=>i;
        return new ki({
            ...ve(this._def),
            innerType: this,
            defaultValue: r,
            typeName: le.ZodDefault
        })
    }
    brand() {
        return new hd({
            typeName: le.ZodBranded,
            type: this,
            ...ve(this._def)
        })
    }
    catch(i) {
        const r = typeof i == "function" ? i : ()=>i;
        return new La({
            ...ve(this._def),
            innerType: this,
            catchValue: r,
            typeName: le.ZodCatch
        })
    }
    describe(i) {
        const r = this.constructor;
        return new r({
            ...this._def,
            description: i
        })
    }
    pipe(i) {
        return Ei.create(this, i)
    }
    readonly() {
        return Da.create(this)
    }
    isOptional() {
        return this.safeParse(void 0).success
    }
    isNullable() {
        return this.safeParse(null).success
    }
}
const M_ = /^c[^\s-]{8,}$/i
  , N_ = /^[a-z][a-z0-9]*$/
  , z_ = /^[0-9A-HJKMNP-TV-Z]{26}$/
  , B_ = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i
  , L_ = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i
  , I_ = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let ws;
const D_ = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/
  , Z_ = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/
  , R_ = n=>n.precision ? n.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${n.precision}}Z$`) : n.precision === 0 ? n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : n.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function F_(n, i) {
    return !!((i === "v4" || !i) && D_.test(n) || (i === "v6" || !i) && Z_.test(n))
}
class Rt extends be {
    _parse(i) {
        if (this._def.coerce && (i.data = String(i.data)),
        this._getType(i) !== J.string) {
            const s = this._getOrReturnCtx(i);
            return ee(s, {
                code: q.invalid_type,
                expected: J.string,
                received: s.parsedType
            }),
            he
        }
        const r = new nt;
        let o;
        for (const s of this._def.checks)
            if (s.kind === "min")
                i.data.length < s.value && (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    code: q.too_small,
                    minimum: s.value,
                    type: "string",
                    inclusive: !0,
                    exact: !1,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "max")
                i.data.length > s.value && (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    code: q.too_big,
                    maximum: s.value,
                    type: "string",
                    inclusive: !0,
                    exact: !1,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "length") {
                const l = i.data.length > s.value
                  , c = i.data.length < s.value;
                (l || c) && (o = this._getOrReturnCtx(i, o),
                l ? ee(o, {
                    code: q.too_big,
                    maximum: s.value,
                    type: "string",
                    inclusive: !0,
                    exact: !0,
                    message: s.message
                }) : c && ee(o, {
                    code: q.too_small,
                    minimum: s.value,
                    type: "string",
                    inclusive: !0,
                    exact: !0,
                    message: s.message
                }),
                r.dirty())
            } else if (s.kind === "email")
                L_.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "email",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "emoji")
                ws || (ws = new RegExp(I_,"u")),
                ws.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "emoji",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "uuid")
                B_.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "uuid",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "cuid")
                M_.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "cuid",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "cuid2")
                N_.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "cuid2",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "ulid")
                z_.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "ulid",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty());
            else if (s.kind === "url")
                try {
                    new URL(i.data)
                } catch {
                    o = this._getOrReturnCtx(i, o),
                    ee(o, {
                        validation: "url",
                        code: q.invalid_string,
                        message: s.message
                    }),
                    r.dirty()
                }
            else
                s.kind === "regex" ? (s.regex.lastIndex = 0,
                s.regex.test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "regex",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty())) : s.kind === "trim" ? i.data = i.data.trim() : s.kind === "includes" ? i.data.includes(s.value, s.position) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    code: q.invalid_string,
                    validation: {
                        includes: s.value,
                        position: s.position
                    },
                    message: s.message
                }),
                r.dirty()) : s.kind === "toLowerCase" ? i.data = i.data.toLowerCase() : s.kind === "toUpperCase" ? i.data = i.data.toUpperCase() : s.kind === "startsWith" ? i.data.startsWith(s.value) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    code: q.invalid_string,
                    validation: {
                        startsWith: s.value
                    },
                    message: s.message
                }),
                r.dirty()) : s.kind === "endsWith" ? i.data.endsWith(s.value) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    code: q.invalid_string,
                    validation: {
                        endsWith: s.value
                    },
                    message: s.message
                }),
                r.dirty()) : s.kind === "datetime" ? R_(s).test(i.data) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    code: q.invalid_string,
                    validation: "datetime",
                    message: s.message
                }),
                r.dirty()) : s.kind === "ip" ? F_(i.data, s.version) || (o = this._getOrReturnCtx(i, o),
                ee(o, {
                    validation: "ip",
                    code: q.invalid_string,
                    message: s.message
                }),
                r.dirty()) : Te.assertNever(s);
        return {
            status: r.value,
            value: i.data
        }
    }
    _regex(i, r, o) {
        return this.refinement(s=>i.test(s), {
            validation: r,
            code: q.invalid_string,
            ...ie.errToObj(o)
        })
    }
    _addCheck(i) {
        return new Rt({
            ...this._def,
            checks: [...this._def.checks, i]
        })
    }
    email(i) {
        return this._addCheck({
            kind: "email",
            ...ie.errToObj(i)
        })
    }
    url(i) {
        return this._addCheck({
            kind: "url",
            ...ie.errToObj(i)
        })
    }
    emoji(i) {
        return this._addCheck({
            kind: "emoji",
            ...ie.errToObj(i)
        })
    }
    uuid(i) {
        return this._addCheck({
            kind: "uuid",
            ...ie.errToObj(i)
        })
    }
    cuid(i) {
        return this._addCheck({
            kind: "cuid",
            ...ie.errToObj(i)
        })
    }
    cuid2(i) {
        return this._addCheck({
            kind: "cuid2",
            ...ie.errToObj(i)
        })
    }
    ulid(i) {
        return this._addCheck({
            kind: "ulid",
            ...ie.errToObj(i)
        })
    }
    ip(i) {
        return this._addCheck({
            kind: "ip",
            ...ie.errToObj(i)
        })
    }
    datetime(i) {
        var r;
        return typeof i == "string" ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            message: i
        }) : this._addCheck({
            kind: "datetime",
            precision: typeof (i == null ? void 0 : i.precision) > "u" ? null : i == null ? void 0 : i.precision,
            offset: (r = i == null ? void 0 : i.offset) !== null && r !== void 0 ? r : !1,
            ...ie.errToObj(i == null ? void 0 : i.message)
        })
    }
    regex(i, r) {
        return this._addCheck({
            kind: "regex",
            regex: i,
            ...ie.errToObj(r)
        })
    }
    includes(i, r) {
        return this._addCheck({
            kind: "includes",
            value: i,
            position: r == null ? void 0 : r.position,
            ...ie.errToObj(r == null ? void 0 : r.message)
        })
    }
    startsWith(i, r) {
        return this._addCheck({
            kind: "startsWith",
            value: i,
            ...ie.errToObj(r)
        })
    }
    endsWith(i, r) {
        return this._addCheck({
            kind: "endsWith",
            value: i,
            ...ie.errToObj(r)
        })
    }
    min(i, r) {
        return this._addCheck({
            kind: "min",
            value: i,
            ...ie.errToObj(r)
        })
    }
    max(i, r) {
        return this._addCheck({
            kind: "max",
            value: i,
            ...ie.errToObj(r)
        })
    }
    length(i, r) {
        return this._addCheck({
            kind: "length",
            value: i,
            ...ie.errToObj(r)
        })
    }
    nonempty(i) {
        return this.min(1, ie.errToObj(i))
    }
    trim() {
        return new Rt({
            ...this._def,
            checks: [...this._def.checks, {
                kind: "trim"
            }]
        })
    }
    toLowerCase() {
        return new Rt({
            ...this._def,
            checks: [...this._def.checks, {
                kind: "toLowerCase"
            }]
        })
    }
    toUpperCase() {
        return new Rt({
            ...this._def,
            checks: [...this._def.checks, {
                kind: "toUpperCase"
            }]
        })
    }
    get isDatetime() {
        return !!this._def.checks.find(i=>i.kind === "datetime")
    }
    get isEmail() {
        return !!this._def.checks.find(i=>i.kind === "email")
    }
    get isURL() {
        return !!this._def.checks.find(i=>i.kind === "url")
    }
    get isEmoji() {
        return !!this._def.checks.find(i=>i.kind === "emoji")
    }
    get isUUID() {
        return !!this._def.checks.find(i=>i.kind === "uuid")
    }
    get isCUID() {
        return !!this._def.checks.find(i=>i.kind === "cuid")
    }
    get isCUID2() {
        return !!this._def.checks.find(i=>i.kind === "cuid2")
    }
    get isULID() {
        return !!this._def.checks.find(i=>i.kind === "ulid")
    }
    get isIP() {
        return !!this._def.checks.find(i=>i.kind === "ip")
    }
    get minLength() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "min" && (i === null || r.value > i) && (i = r.value);
        return i
    }
    get maxLength() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "max" && (i === null || r.value < i) && (i = r.value);
        return i
    }
}
Rt.create = n=>{
    var i;
    return new Rt({
        checks: [],
        typeName: le.ZodString,
        coerce: (i = n == null ? void 0 : n.coerce) !== null && i !== void 0 ? i : !1,
        ...ve(n)
    })
}
;
function W_(n, i) {
    const r = (n.toString().split(".")[1] || "").length
      , o = (i.toString().split(".")[1] || "").length
      , s = r > o ? r : o
      , l = parseInt(n.toFixed(s).replace(".", ""))
      , c = parseInt(i.toFixed(s).replace(".", ""));
    return l % c / Math.pow(10, s)
}
class Ln extends be {
    constructor() {
        super(...arguments),
        this.min = this.gte,
        this.max = this.lte,
        this.step = this.multipleOf
    }
    _parse(i) {
        if (this._def.coerce && (i.data = Number(i.data)),
        this._getType(i) !== J.number) {
            const s = this._getOrReturnCtx(i);
            return ee(s, {
                code: q.invalid_type,
                expected: J.number,
                received: s.parsedType
            }),
            he
        }
        let r;
        const o = new nt;
        for (const s of this._def.checks)
            s.kind === "int" ? Te.isInteger(i.data) || (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.invalid_type,
                expected: "integer",
                received: "float",
                message: s.message
            }),
            o.dirty()) : s.kind === "min" ? (s.inclusive ? i.data < s.value : i.data <= s.value) && (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.too_small,
                minimum: s.value,
                type: "number",
                inclusive: s.inclusive,
                exact: !1,
                message: s.message
            }),
            o.dirty()) : s.kind === "max" ? (s.inclusive ? i.data > s.value : i.data >= s.value) && (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.too_big,
                maximum: s.value,
                type: "number",
                inclusive: s.inclusive,
                exact: !1,
                message: s.message
            }),
            o.dirty()) : s.kind === "multipleOf" ? W_(i.data, s.value) !== 0 && (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.not_multiple_of,
                multipleOf: s.value,
                message: s.message
            }),
            o.dirty()) : s.kind === "finite" ? Number.isFinite(i.data) || (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.not_finite,
                message: s.message
            }),
            o.dirty()) : Te.assertNever(s);
        return {
            status: o.value,
            value: i.data
        }
    }
    gte(i, r) {
        return this.setLimit("min", i, !0, ie.toString(r))
    }
    gt(i, r) {
        return this.setLimit("min", i, !1, ie.toString(r))
    }
    lte(i, r) {
        return this.setLimit("max", i, !0, ie.toString(r))
    }
    lt(i, r) {
        return this.setLimit("max", i, !1, ie.toString(r))
    }
    setLimit(i, r, o, s) {
        return new Ln({
            ...this._def,
            checks: [...this._def.checks, {
                kind: i,
                value: r,
                inclusive: o,
                message: ie.toString(s)
            }]
        })
    }
    _addCheck(i) {
        return new Ln({
            ...this._def,
            checks: [...this._def.checks, i]
        })
    }
    int(i) {
        return this._addCheck({
            kind: "int",
            message: ie.toString(i)
        })
    }
    positive(i) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: ie.toString(i)
        })
    }
    negative(i) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: ie.toString(i)
        })
    }
    nonpositive(i) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: ie.toString(i)
        })
    }
    nonnegative(i) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: ie.toString(i)
        })
    }
    multipleOf(i, r) {
        return this._addCheck({
            kind: "multipleOf",
            value: i,
            message: ie.toString(r)
        })
    }
    finite(i) {
        return this._addCheck({
            kind: "finite",
            message: ie.toString(i)
        })
    }
    safe(i) {
        return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: ie.toString(i)
        })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: ie.toString(i)
        })
    }
    get minValue() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "min" && (i === null || r.value > i) && (i = r.value);
        return i
    }
    get maxValue() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "max" && (i === null || r.value < i) && (i = r.value);
        return i
    }
    get isInt() {
        return !!this._def.checks.find(i=>i.kind === "int" || i.kind === "multipleOf" && Te.isInteger(i.value))
    }
    get isFinite() {
        let i = null
          , r = null;
        for (const o of this._def.checks) {
            if (o.kind === "finite" || o.kind === "int" || o.kind === "multipleOf")
                return !0;
            o.kind === "min" ? (r === null || o.value > r) && (r = o.value) : o.kind === "max" && (i === null || o.value < i) && (i = o.value)
        }
        return Number.isFinite(r) && Number.isFinite(i)
    }
}
Ln.create = n=>new Ln({
    checks: [],
    typeName: le.ZodNumber,
    coerce: (n == null ? void 0 : n.coerce) || !1,
    ...ve(n)
});
class In extends be {
    constructor() {
        super(...arguments),
        this.min = this.gte,
        this.max = this.lte
    }
    _parse(i) {
        if (this._def.coerce && (i.data = BigInt(i.data)),
        this._getType(i) !== J.bigint) {
            const s = this._getOrReturnCtx(i);
            return ee(s, {
                code: q.invalid_type,
                expected: J.bigint,
                received: s.parsedType
            }),
            he
        }
        let r;
        const o = new nt;
        for (const s of this._def.checks)
            s.kind === "min" ? (s.inclusive ? i.data < s.value : i.data <= s.value) && (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.too_small,
                type: "bigint",
                minimum: s.value,
                inclusive: s.inclusive,
                message: s.message
            }),
            o.dirty()) : s.kind === "max" ? (s.inclusive ? i.data > s.value : i.data >= s.value) && (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.too_big,
                type: "bigint",
                maximum: s.value,
                inclusive: s.inclusive,
                message: s.message
            }),
            o.dirty()) : s.kind === "multipleOf" ? i.data % s.value !== BigInt(0) && (r = this._getOrReturnCtx(i, r),
            ee(r, {
                code: q.not_multiple_of,
                multipleOf: s.value,
                message: s.message
            }),
            o.dirty()) : Te.assertNever(s);
        return {
            status: o.value,
            value: i.data
        }
    }
    gte(i, r) {
        return this.setLimit("min", i, !0, ie.toString(r))
    }
    gt(i, r) {
        return this.setLimit("min", i, !1, ie.toString(r))
    }
    lte(i, r) {
        return this.setLimit("max", i, !0, ie.toString(r))
    }
    lt(i, r) {
        return this.setLimit("max", i, !1, ie.toString(r))
    }
    setLimit(i, r, o, s) {
        return new In({
            ...this._def,
            checks: [...this._def.checks, {
                kind: i,
                value: r,
                inclusive: o,
                message: ie.toString(s)
            }]
        })
    }
    _addCheck(i) {
        return new In({
            ...this._def,
            checks: [...this._def.checks, i]
        })
    }
    positive(i) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: ie.toString(i)
        })
    }
    negative(i) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: ie.toString(i)
        })
    }
    nonpositive(i) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: ie.toString(i)
        })
    }
    nonnegative(i) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: ie.toString(i)
        })
    }
    multipleOf(i, r) {
        return this._addCheck({
            kind: "multipleOf",
            value: i,
            message: ie.toString(r)
        })
    }
    get minValue() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "min" && (i === null || r.value > i) && (i = r.value);
        return i
    }
    get maxValue() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "max" && (i === null || r.value < i) && (i = r.value);
        return i
    }
}
In.create = n=>{
    var i;
    return new In({
        checks: [],
        typeName: le.ZodBigInt,
        coerce: (i = n == null ? void 0 : n.coerce) !== null && i !== void 0 ? i : !1,
        ...ve(n)
    })
}
;
class hi extends be {
    _parse(i) {
        if (this._def.coerce && (i.data = !!i.data),
        this._getType(i) !== J.boolean) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                code: q.invalid_type,
                expected: J.boolean,
                received: r.parsedType
            }),
            he
        }
        return lt(i.data)
    }
}
hi.create = n=>new hi({
    typeName: le.ZodBoolean,
    coerce: (n == null ? void 0 : n.coerce) || !1,
    ...ve(n)
});
class rr extends be {
    _parse(i) {
        if (this._def.coerce && (i.data = new Date(i.data)),
        this._getType(i) !== J.date) {
            const s = this._getOrReturnCtx(i);
            return ee(s, {
                code: q.invalid_type,
                expected: J.date,
                received: s.parsedType
            }),
            he
        }
        if (isNaN(i.data.getTime())) {
            const s = this._getOrReturnCtx(i);
            return ee(s, {
                code: q.invalid_date
            }),
            he
        }
        const r = new nt;
        let o;
        for (const s of this._def.checks)
            s.kind === "min" ? i.data.getTime() < s.value && (o = this._getOrReturnCtx(i, o),
            ee(o, {
                code: q.too_small,
                message: s.message,
                inclusive: !0,
                exact: !1,
                minimum: s.value,
                type: "date"
            }),
            r.dirty()) : s.kind === "max" ? i.data.getTime() > s.value && (o = this._getOrReturnCtx(i, o),
            ee(o, {
                code: q.too_big,
                message: s.message,
                inclusive: !0,
                exact: !1,
                maximum: s.value,
                type: "date"
            }),
            r.dirty()) : Te.assertNever(s);
        return {
            status: r.value,
            value: new Date(i.data.getTime())
        }
    }
    _addCheck(i) {
        return new rr({
            ...this._def,
            checks: [...this._def.checks, i]
        })
    }
    min(i, r) {
        return this._addCheck({
            kind: "min",
            value: i.getTime(),
            message: ie.toString(r)
        })
    }
    max(i, r) {
        return this._addCheck({
            kind: "max",
            value: i.getTime(),
            message: ie.toString(r)
        })
    }
    get minDate() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "min" && (i === null || r.value > i) && (i = r.value);
        return i != null ? new Date(i) : null
    }
    get maxDate() {
        let i = null;
        for (const r of this._def.checks)
            r.kind === "max" && (i === null || r.value < i) && (i = r.value);
        return i != null ? new Date(i) : null
    }
}
rr.create = n=>new rr({
    checks: [],
    coerce: (n == null ? void 0 : n.coerce) || !1,
    typeName: le.ZodDate,
    ...ve(n)
});
class Na extends be {
    _parse(i) {
        if (this._getType(i) !== J.symbol) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                code: q.invalid_type,
                expected: J.symbol,
                received: r.parsedType
            }),
            he
        }
        return lt(i.data)
    }
}
Na.create = n=>new Na({
    typeName: le.ZodSymbol,
    ...ve(n)
});
class vi extends be {
    _parse(i) {
        if (this._getType(i) !== J.undefined) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                code: q.invalid_type,
                expected: J.undefined,
                received: r.parsedType
            }),
            he
        }
        return lt(i.data)
    }
}
vi.create = n=>new vi({
    typeName: le.ZodUndefined,
    ...ve(n)
});
class gi extends be {
    _parse(i) {
        if (this._getType(i) !== J.null) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                code: q.invalid_type,
                expected: J.null,
                received: r.parsedType
            }),
            he
        }
        return lt(i.data)
    }
}
gi.create = n=>new gi({
    typeName: le.ZodNull,
    ...ve(n)
});
class Mr extends be {
    constructor() {
        super(...arguments),
        this._any = !0
    }
    _parse(i) {
        return lt(i.data)
    }
}
Mr.create = n=>new Mr({
    typeName: le.ZodAny,
    ...ve(n)
});
class tr extends be {
    constructor() {
        super(...arguments),
        this._unknown = !0
    }
    _parse(i) {
        return lt(i.data)
    }
}
tr.create = n=>new tr({
    typeName: le.ZodUnknown,
    ...ve(n)
});
class mn extends be {
    _parse(i) {
        const r = this._getOrReturnCtx(i);
        return ee(r, {
            code: q.invalid_type,
            expected: J.never,
            received: r.parsedType
        }),
        he
    }
}
mn.create = n=>new mn({
    typeName: le.ZodNever,
    ...ve(n)
});
class za extends be {
    _parse(i) {
        if (this._getType(i) !== J.undefined) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                code: q.invalid_type,
                expected: J.void,
                received: r.parsedType
            }),
            he
        }
        return lt(i.data)
    }
}
za.create = n=>new za({
    typeName: le.ZodVoid,
    ...ve(n)
});
class Wt extends be {
    _parse(i) {
        const {ctx: r, status: o} = this._processInputParams(i)
          , s = this._def;
        if (r.parsedType !== J.array)
            return ee(r, {
                code: q.invalid_type,
                expected: J.array,
                received: r.parsedType
            }),
            he;
        if (s.exactLength !== null) {
            const c = r.data.length > s.exactLength.value
              , f = r.data.length < s.exactLength.value;
            (c || f) && (ee(r, {
                code: c ? q.too_big : q.too_small,
                minimum: f ? s.exactLength.value : void 0,
                maximum: c ? s.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: s.exactLength.message
            }),
            o.dirty())
        }
        if (s.minLength !== null && r.data.length < s.minLength.value && (ee(r, {
            code: q.too_small,
            minimum: s.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.minLength.message
        }),
        o.dirty()),
        s.maxLength !== null && r.data.length > s.maxLength.value && (ee(r, {
            code: q.too_big,
            maximum: s.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.maxLength.message
        }),
        o.dirty()),
        r.common.async)
            return Promise.all([...r.data].map((c,f)=>s.type._parseAsync(new Jt(r,c,r.path,f)))).then(c=>nt.mergeArray(o, c));
        const l = [...r.data].map((c,f)=>s.type._parseSync(new Jt(r,c,r.path,f)));
        return nt.mergeArray(o, l)
    }
    get element() {
        return this._def.type
    }
    min(i, r) {
        return new Wt({
            ...this._def,
            minLength: {
                value: i,
                message: ie.toString(r)
            }
        })
    }
    max(i, r) {
        return new Wt({
            ...this._def,
            maxLength: {
                value: i,
                message: ie.toString(r)
            }
        })
    }
    length(i, r) {
        return new Wt({
            ...this._def,
            exactLength: {
                value: i,
                message: ie.toString(r)
            }
        })
    }
    nonempty(i) {
        return this.min(1, i)
    }
}
Wt.create = (n,i)=>new Wt({
    type: n,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: le.ZodArray,
    ...ve(i)
});
function $r(n) {
    if (n instanceof De) {
        const i = {};
        for (const r in n.shape) {
            const o = n.shape[r];
            i[r] = gn.create($r(o))
        }
        return new De({
            ...n._def,
            shape: ()=>i
        })
    } else
        return n instanceof Wt ? new Wt({
            ...n._def,
            type: $r(n.element)
        }) : n instanceof gn ? gn.create($r(n.unwrap())) : n instanceof ar ? ar.create($r(n.unwrap())) : n instanceof Qt ? Qt.create(n.items.map(i=>$r(i))) : n
}
class De extends be {
    constructor() {
        super(...arguments),
        this._cached = null,
        this.nonstrict = this.passthrough,
        this.augment = this.extend
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const i = this._def.shape()
          , r = Te.objectKeys(i);
        return this._cached = {
            shape: i,
            keys: r
        }
    }
    _parse(i) {
        if (this._getType(i) !== J.object) {
            const v = this._getOrReturnCtx(i);
            return ee(v, {
                code: q.invalid_type,
                expected: J.object,
                received: v.parsedType
            }),
            he
        }
        const {status: r, ctx: o} = this._processInputParams(i)
          , {shape: s, keys: l} = this._getCached()
          , c = [];
        if (!(this._def.catchall instanceof mn && this._def.unknownKeys === "strip"))
            for (const v in o.data)
                l.includes(v) || c.push(v);
        const f = [];
        for (const v of l) {
            const g = s[v]
              , y = o.data[v];
            f.push({
                key: {
                    status: "valid",
                    value: v
                },
                value: g._parse(new Jt(o,y,o.path,v)),
                alwaysSet: v in o.data
            })
        }
        if (this._def.catchall instanceof mn) {
            const v = this._def.unknownKeys;
            if (v === "passthrough")
                for (const g of c)
                    f.push({
                        key: {
                            status: "valid",
                            value: g
                        },
                        value: {
                            status: "valid",
                            value: o.data[g]
                        }
                    });
            else if (v === "strict")
                c.length > 0 && (ee(o, {
                    code: q.unrecognized_keys,
                    keys: c
                }),
                r.dirty());
            else if (v !== "strip")
                throw new Error("Internal ZodObject error: invalid unknownKeys value.")
        } else {
            const v = this._def.catchall;
            for (const g of c) {
                const y = o.data[g];
                f.push({
                    key: {
                        status: "valid",
                        value: g
                    },
                    value: v._parse(new Jt(o,y,o.path,g)),
                    alwaysSet: g in o.data
                })
            }
        }
        return o.common.async ? Promise.resolve().then(async()=>{
            const v = [];
            for (const g of f) {
                const y = await g.key;
                v.push({
                    key: y,
                    value: await g.value,
                    alwaysSet: g.alwaysSet
                })
            }
            return v
        }
        ).then(v=>nt.mergeObjectSync(r, v)) : nt.mergeObjectSync(r, f)
    }
    get shape() {
        return this._def.shape()
    }
    strict(i) {
        return ie.errToObj,
        new De({
            ...this._def,
            unknownKeys: "strict",
            ...i !== void 0 ? {
                errorMap: (r,o)=>{
                    var s, l, c, f;
                    const v = (c = (l = (s = this._def).errorMap) === null || l === void 0 ? void 0 : l.call(s, r, o).message) !== null && c !== void 0 ? c : o.defaultError;
                    return r.code === "unrecognized_keys" ? {
                        message: (f = ie.errToObj(i).message) !== null && f !== void 0 ? f : v
                    } : {
                        message: v
                    }
                }
            } : {}
        })
    }
    strip() {
        return new De({
            ...this._def,
            unknownKeys: "strip"
        })
    }
    passthrough() {
        return new De({
            ...this._def,
            unknownKeys: "passthrough"
        })
    }
    extend(i) {
        return new De({
            ...this._def,
            shape: ()=>({
                ...this._def.shape(),
                ...i
            })
        })
    }
    merge(i) {
        return new De({
            unknownKeys: i._def.unknownKeys,
            catchall: i._def.catchall,
            shape: ()=>({
                ...this._def.shape(),
                ...i._def.shape()
            }),
            typeName: le.ZodObject
        })
    }
    setKey(i, r) {
        return this.augment({
            [i]: r
        })
    }
    catchall(i) {
        return new De({
            ...this._def,
            catchall: i
        })
    }
    pick(i) {
        const r = {};
        return Te.objectKeys(i).forEach(o=>{
            i[o] && this.shape[o] && (r[o] = this.shape[o])
        }
        ),
        new De({
            ...this._def,
            shape: ()=>r
        })
    }
    omit(i) {
        const r = {};
        return Te.objectKeys(this.shape).forEach(o=>{
            i[o] || (r[o] = this.shape[o])
        }
        ),
        new De({
            ...this._def,
            shape: ()=>r
        })
    }
    deepPartial() {
        return $r(this)
    }
    partial(i) {
        const r = {};
        return Te.objectKeys(this.shape).forEach(o=>{
            const s = this.shape[o];
            i && !i[o] ? r[o] = s : r[o] = s.optional()
        }
        ),
        new De({
            ...this._def,
            shape: ()=>r
        })
    }
    required(i) {
        const r = {};
        return Te.objectKeys(this.shape).forEach(o=>{
            if (i && !i[o])
                r[o] = this.shape[o];
            else {
                let s = this.shape[o];
                for (; s instanceof gn; )
                    s = s._def.innerType;
                r[o] = s
            }
        }
        ),
        new De({
            ...this._def,
            shape: ()=>r
        })
    }
    keyof() {
        return pd(Te.objectKeys(this.shape))
    }
}
De.create = (n,i)=>new De({
    shape: ()=>n,
    unknownKeys: "strip",
    catchall: mn.create(),
    typeName: le.ZodObject,
    ...ve(i)
});
De.strictCreate = (n,i)=>new De({
    shape: ()=>n,
    unknownKeys: "strict",
    catchall: mn.create(),
    typeName: le.ZodObject,
    ...ve(i)
});
De.lazycreate = (n,i)=>new De({
    shape: n,
    unknownKeys: "strip",
    catchall: mn.create(),
    typeName: le.ZodObject,
    ...ve(i)
});
class mi extends be {
    _parse(i) {
        const {ctx: r} = this._processInputParams(i)
          , o = this._def.options;
        function s(l) {
            for (const f of l)
                if (f.result.status === "valid")
                    return f.result;
            for (const f of l)
                if (f.result.status === "dirty")
                    return r.common.issues.push(...f.ctx.common.issues),
                    f.result;
            const c = l.map(f=>new Ft(f.ctx.common.issues));
            return ee(r, {
                code: q.invalid_union,
                unionErrors: c
            }),
            he
        }
        if (r.common.async)
            return Promise.all(o.map(async l=>{
                const c = {
                    ...r,
                    common: {
                        ...r.common,
                        issues: []
                    },
                    parent: null
                };
                return {
                    result: await l._parseAsync({
                        data: r.data,
                        path: r.path,
                        parent: c
                    }),
                    ctx: c
                }
            }
            )).then(s);
        {
            let l;
            const c = [];
            for (const v of o) {
                const g = {
                    ...r,
                    common: {
                        ...r.common,
                        issues: []
                    },
                    parent: null
                }
                  , y = v._parseSync({
                    data: r.data,
                    path: r.path,
                    parent: g
                });
                if (y.status === "valid")
                    return y;
                y.status === "dirty" && !l && (l = {
                    result: y,
                    ctx: g
                }),
                g.common.issues.length && c.push(g.common.issues)
            }
            if (l)
                return r.common.issues.push(...l.ctx.common.issues),
                l.result;
            const f = c.map(v=>new Ft(v));
            return ee(r, {
                code: q.invalid_union,
                unionErrors: f
            }),
            he
        }
    }
    get options() {
        return this._def.options
    }
}
mi.create = (n,i)=>new mi({
    options: n,
    typeName: le.ZodUnion,
    ...ve(i)
});
const $a = n=>n instanceof _i ? $a(n.schema) : n instanceof Vt ? $a(n.innerType()) : n instanceof xi ? [n.value] : n instanceof Dn ? n.options : n instanceof wi ? Object.keys(n.enum) : n instanceof ki ? $a(n._def.innerType) : n instanceof vi ? [void 0] : n instanceof gi ? [null] : null;
class qa extends be {
    _parse(i) {
        const {ctx: r} = this._processInputParams(i);
        if (r.parsedType !== J.object)
            return ee(r, {
                code: q.invalid_type,
                expected: J.object,
                received: r.parsedType
            }),
            he;
        const o = this.discriminator
          , s = r.data[o]
          , l = this.optionsMap.get(s);
        return l ? r.common.async ? l._parseAsync({
            data: r.data,
            path: r.path,
            parent: r
        }) : l._parseSync({
            data: r.data,
            path: r.path,
            parent: r
        }) : (ee(r, {
            code: q.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [o]
        }),
        he)
    }
    get discriminator() {
        return this._def.discriminator
    }
    get options() {
        return this._def.options
    }
    get optionsMap() {
        return this._def.optionsMap
    }
    static create(i, r, o) {
        const s = new Map;
        for (const l of r) {
            const c = $a(l.shape[i]);
            if (!c)
                throw new Error(`A discriminator value for key \`${i}\` could not be extracted from all schema options`);
            for (const f of c) {
                if (s.has(f))
                    throw new Error(`Discriminator property ${String(i)} has duplicate value ${String(f)}`);
                s.set(f, l)
            }
        }
        return new qa({
            typeName: le.ZodDiscriminatedUnion,
            discriminator: i,
            options: r,
            optionsMap: s,
            ...ve(o)
        })
    }
}
function Ns(n, i) {
    const r = Mn(n)
      , o = Mn(i);
    if (n === i)
        return {
            valid: !0,
            data: n
        };
    if (r === J.object && o === J.object) {
        const s = Te.objectKeys(i)
          , l = Te.objectKeys(n).filter(f=>s.indexOf(f) !== -1)
          , c = {
            ...n,
            ...i
        };
        for (const f of l) {
            const v = Ns(n[f], i[f]);
            if (!v.valid)
                return {
                    valid: !1
                };
            c[f] = v.data
        }
        return {
            valid: !0,
            data: c
        }
    } else if (r === J.array && o === J.array) {
        if (n.length !== i.length)
            return {
                valid: !1
            };
        const s = [];
        for (let l = 0; l < n.length; l++) {
            const c = n[l]
              , f = i[l]
              , v = Ns(c, f);
            if (!v.valid)
                return {
                    valid: !1
                };
            s.push(v.data)
        }
        return {
            valid: !0,
            data: s
        }
    } else
        return r === J.date && o === J.date && +n == +i ? {
            valid: !0,
            data: n
        } : {
            valid: !1
        }
}
class yi extends be {
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i)
          , s = (l,c)=>{
            if (Ps(l) || Ps(c))
                return he;
            const f = Ns(l.value, c.value);
            return f.valid ? ((Ms(l) || Ms(c)) && r.dirty(),
            {
                status: r.value,
                value: f.data
            }) : (ee(o, {
                code: q.invalid_intersection_types
            }),
            he)
        }
        ;
        return o.common.async ? Promise.all([this._def.left._parseAsync({
            data: o.data,
            path: o.path,
            parent: o
        }), this._def.right._parseAsync({
            data: o.data,
            path: o.path,
            parent: o
        })]).then(([l,c])=>s(l, c)) : s(this._def.left._parseSync({
            data: o.data,
            path: o.path,
            parent: o
        }), this._def.right._parseSync({
            data: o.data,
            path: o.path,
            parent: o
        }))
    }
}
yi.create = (n,i,r)=>new yi({
    left: n,
    right: i,
    typeName: le.ZodIntersection,
    ...ve(r)
});
class Qt extends be {
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i);
        if (o.parsedType !== J.array)
            return ee(o, {
                code: q.invalid_type,
                expected: J.array,
                received: o.parsedType
            }),
            he;
        if (o.data.length < this._def.items.length)
            return ee(o, {
                code: q.too_small,
                minimum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: "array"
            }),
            he;
        !this._def.rest && o.data.length > this._def.items.length && (ee(o, {
            code: q.too_big,
            maximum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array"
        }),
        r.dirty());
        const s = [...o.data].map((l,c)=>{
            const f = this._def.items[c] || this._def.rest;
            return f ? f._parse(new Jt(o,l,o.path,c)) : null
        }
        ).filter(l=>!!l);
        return o.common.async ? Promise.all(s).then(l=>nt.mergeArray(r, l)) : nt.mergeArray(r, s)
    }
    get items() {
        return this._def.items
    }
    rest(i) {
        return new Qt({
            ...this._def,
            rest: i
        })
    }
}
Qt.create = (n,i)=>{
    if (!Array.isArray(n))
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new Qt({
        items: n,
        typeName: le.ZodTuple,
        rest: null,
        ...ve(i)
    })
}
;
class bi extends be {
    get keySchema() {
        return this._def.keyType
    }
    get valueSchema() {
        return this._def.valueType
    }
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i);
        if (o.parsedType !== J.object)
            return ee(o, {
                code: q.invalid_type,
                expected: J.object,
                received: o.parsedType
            }),
            he;
        const s = []
          , l = this._def.keyType
          , c = this._def.valueType;
        for (const f in o.data)
            s.push({
                key: l._parse(new Jt(o,f,o.path,f)),
                value: c._parse(new Jt(o,o.data[f],o.path,f))
            });
        return o.common.async ? nt.mergeObjectAsync(r, s) : nt.mergeObjectSync(r, s)
    }
    get element() {
        return this._def.valueType
    }
    static create(i, r, o) {
        return r instanceof be ? new bi({
            keyType: i,
            valueType: r,
            typeName: le.ZodRecord,
            ...ve(o)
        }) : new bi({
            keyType: Rt.create(),
            valueType: i,
            typeName: le.ZodRecord,
            ...ve(r)
        })
    }
}
class Ba extends be {
    get keySchema() {
        return this._def.keyType
    }
    get valueSchema() {
        return this._def.valueType
    }
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i);
        if (o.parsedType !== J.map)
            return ee(o, {
                code: q.invalid_type,
                expected: J.map,
                received: o.parsedType
            }),
            he;
        const s = this._def.keyType
          , l = this._def.valueType
          , c = [...o.data.entries()].map(([f,v],g)=>({
            key: s._parse(new Jt(o,f,o.path,[g, "key"])),
            value: l._parse(new Jt(o,v,o.path,[g, "value"]))
        }));
        if (o.common.async) {
            const f = new Map;
            return Promise.resolve().then(async()=>{
                for (const v of c) {
                    const g = await v.key
                      , y = await v.value;
                    if (g.status === "aborted" || y.status === "aborted")
                        return he;
                    (g.status === "dirty" || y.status === "dirty") && r.dirty(),
                    f.set(g.value, y.value)
                }
                return {
                    status: r.value,
                    value: f
                }
            }
            )
        } else {
            const f = new Map;
            for (const v of c) {
                const g = v.key
                  , y = v.value;
                if (g.status === "aborted" || y.status === "aborted")
                    return he;
                (g.status === "dirty" || y.status === "dirty") && r.dirty(),
                f.set(g.value, y.value)
            }
            return {
                status: r.value,
                value: f
            }
        }
    }
}
Ba.create = (n,i,r)=>new Ba({
    valueType: i,
    keyType: n,
    typeName: le.ZodMap,
    ...ve(r)
});
class ir extends be {
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i);
        if (o.parsedType !== J.set)
            return ee(o, {
                code: q.invalid_type,
                expected: J.set,
                received: o.parsedType
            }),
            he;
        const s = this._def;
        s.minSize !== null && o.data.size < s.minSize.value && (ee(o, {
            code: q.too_small,
            minimum: s.minSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: s.minSize.message
        }),
        r.dirty()),
        s.maxSize !== null && o.data.size > s.maxSize.value && (ee(o, {
            code: q.too_big,
            maximum: s.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: s.maxSize.message
        }),
        r.dirty());
        const l = this._def.valueType;
        function c(v) {
            const g = new Set;
            for (const y of v) {
                if (y.status === "aborted")
                    return he;
                y.status === "dirty" && r.dirty(),
                g.add(y.value)
            }
            return {
                status: r.value,
                value: g
            }
        }
        const f = [...o.data.values()].map((v,g)=>l._parse(new Jt(o,v,o.path,g)));
        return o.common.async ? Promise.all(f).then(v=>c(v)) : c(f)
    }
    min(i, r) {
        return new ir({
            ...this._def,
            minSize: {
                value: i,
                message: ie.toString(r)
            }
        })
    }
    max(i, r) {
        return new ir({
            ...this._def,
            maxSize: {
                value: i,
                message: ie.toString(r)
            }
        })
    }
    size(i, r) {
        return this.min(i, r).max(i, r)
    }
    nonempty(i) {
        return this.min(1, i)
    }
}
ir.create = (n,i)=>new ir({
    valueType: n,
    minSize: null,
    maxSize: null,
    typeName: le.ZodSet,
    ...ve(i)
});
class Er extends be {
    constructor() {
        super(...arguments),
        this.validate = this.implement
    }
    _parse(i) {
        const {ctx: r} = this._processInputParams(i);
        if (r.parsedType !== J.function)
            return ee(r, {
                code: q.invalid_type,
                expected: J.function,
                received: r.parsedType
            }),
            he;
        function o(f, v) {
            return Pa({
                data: f,
                path: r.path,
                errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, Ca(), fi].filter(g=>!!g),
                issueData: {
                    code: q.invalid_arguments,
                    argumentsError: v
                }
            })
        }
        function s(f, v) {
            return Pa({
                data: f,
                path: r.path,
                errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, Ca(), fi].filter(g=>!!g),
                issueData: {
                    code: q.invalid_return_type,
                    returnTypeError: v
                }
            })
        }
        const l = {
            errorMap: r.common.contextualErrorMap
        }
          , c = r.data;
        if (this._def.returns instanceof Nr) {
            const f = this;
            return lt(async function(...v) {
                const g = new Ft([])
                  , y = await f._def.args.parseAsync(v, l).catch(N=>{
                    throw g.addIssue(o(v, N)),
                    g
                }
                )
                  , O = await Reflect.apply(c, this, y);
                return await f._def.returns._def.type.parseAsync(O, l).catch(N=>{
                    throw g.addIssue(s(O, N)),
                    g
                }
                )
            })
        } else {
            const f = this;
            return lt(function(...v) {
                const g = f._def.args.safeParse(v, l);
                if (!g.success)
                    throw new Ft([o(v, g.error)]);
                const y = Reflect.apply(c, this, g.data)
                  , O = f._def.returns.safeParse(y, l);
                if (!O.success)
                    throw new Ft([s(y, O.error)]);
                return O.data
            })
        }
    }
    parameters() {
        return this._def.args
    }
    returnType() {
        return this._def.returns
    }
    args(...i) {
        return new Er({
            ...this._def,
            args: Qt.create(i).rest(tr.create())
        })
    }
    returns(i) {
        return new Er({
            ...this._def,
            returns: i
        })
    }
    implement(i) {
        return this.parse(i)
    }
    strictImplement(i) {
        return this.parse(i)
    }
    static create(i, r, o) {
        return new Er({
            args: i || Qt.create([]).rest(tr.create()),
            returns: r || tr.create(),
            typeName: le.ZodFunction,
            ...ve(o)
        })
    }
}
class _i extends be {
    get schema() {
        return this._def.getter()
    }
    _parse(i) {
        const {ctx: r} = this._processInputParams(i);
        return this._def.getter()._parse({
            data: r.data,
            path: r.path,
            parent: r
        })
    }
}
_i.create = (n,i)=>new _i({
    getter: n,
    typeName: le.ZodLazy,
    ...ve(i)
});
class xi extends be {
    _parse(i) {
        if (i.data !== this._def.value) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                received: r.data,
                code: q.invalid_literal,
                expected: this._def.value
            }),
            he
        }
        return {
            status: "valid",
            value: i.data
        }
    }
    get value() {
        return this._def.value
    }
}
xi.create = (n,i)=>new xi({
    value: n,
    typeName: le.ZodLiteral,
    ...ve(i)
});
function pd(n, i) {
    return new Dn({
        values: n,
        typeName: le.ZodEnum,
        ...ve(i)
    })
}
class Dn extends be {
    _parse(i) {
        if (typeof i.data != "string") {
            const r = this._getOrReturnCtx(i)
              , o = this._def.values;
            return ee(r, {
                expected: Te.joinValues(o),
                received: r.parsedType,
                code: q.invalid_type
            }),
            he
        }
        if (this._def.values.indexOf(i.data) === -1) {
            const r = this._getOrReturnCtx(i)
              , o = this._def.values;
            return ee(r, {
                received: r.data,
                code: q.invalid_enum_value,
                options: o
            }),
            he
        }
        return lt(i.data)
    }
    get options() {
        return this._def.values
    }
    get enum() {
        const i = {};
        for (const r of this._def.values)
            i[r] = r;
        return i
    }
    get Values() {
        const i = {};
        for (const r of this._def.values)
            i[r] = r;
        return i
    }
    get Enum() {
        const i = {};
        for (const r of this._def.values)
            i[r] = r;
        return i
    }
    extract(i) {
        return Dn.create(i)
    }
    exclude(i) {
        return Dn.create(this.options.filter(r=>!i.includes(r)))
    }
}
Dn.create = pd;
class wi extends be {
    _parse(i) {
        const r = Te.getValidEnumValues(this._def.values)
          , o = this._getOrReturnCtx(i);
        if (o.parsedType !== J.string && o.parsedType !== J.number) {
            const s = Te.objectValues(r);
            return ee(o, {
                expected: Te.joinValues(s),
                received: o.parsedType,
                code: q.invalid_type
            }),
            he
        }
        if (r.indexOf(i.data) === -1) {
            const s = Te.objectValues(r);
            return ee(o, {
                received: o.data,
                code: q.invalid_enum_value,
                options: s
            }),
            he
        }
        return lt(i.data)
    }
    get enum() {
        return this._def.values
    }
}
wi.create = (n,i)=>new wi({
    values: n,
    typeName: le.ZodNativeEnum,
    ...ve(i)
});
class Nr extends be {
    unwrap() {
        return this._def.type
    }
    _parse(i) {
        const {ctx: r} = this._processInputParams(i);
        if (r.parsedType !== J.promise && r.common.async === !1)
            return ee(r, {
                code: q.invalid_type,
                expected: J.promise,
                received: r.parsedType
            }),
            he;
        const o = r.parsedType === J.promise ? r.data : Promise.resolve(r.data);
        return lt(o.then(s=>this._def.type.parseAsync(s, {
            path: r.path,
            errorMap: r.common.contextualErrorMap
        })))
    }
}
Nr.create = (n,i)=>new Nr({
    type: n,
    typeName: le.ZodPromise,
    ...ve(i)
});
class Vt extends be {
    innerType() {
        return this._def.schema
    }
    sourceType() {
        return this._def.schema._def.typeName === le.ZodEffects ? this._def.schema.sourceType() : this._def.schema
    }
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i)
          , s = this._def.effect || null
          , l = {
            addIssue: c=>{
                ee(o, c),
                c.fatal ? r.abort() : r.dirty()
            }
            ,
            get path() {
                return o.path
            }
        };
        if (l.addIssue = l.addIssue.bind(l),
        s.type === "preprocess") {
            const c = s.transform(o.data, l);
            return o.common.issues.length ? {
                status: "dirty",
                value: o.data
            } : o.common.async ? Promise.resolve(c).then(f=>this._def.schema._parseAsync({
                data: f,
                path: o.path,
                parent: o
            })) : this._def.schema._parseSync({
                data: c,
                path: o.path,
                parent: o
            })
        }
        if (s.type === "refinement") {
            const c = f=>{
                const v = s.refinement(f, l);
                if (o.common.async)
                    return Promise.resolve(v);
                if (v instanceof Promise)
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                return f
            }
            ;
            if (o.common.async === !1) {
                const f = this._def.schema._parseSync({
                    data: o.data,
                    path: o.path,
                    parent: o
                });
                return f.status === "aborted" ? he : (f.status === "dirty" && r.dirty(),
                c(f.value),
                {
                    status: r.value,
                    value: f.value
                })
            } else
                return this._def.schema._parseAsync({
                    data: o.data,
                    path: o.path,
                    parent: o
                }).then(f=>f.status === "aborted" ? he : (f.status === "dirty" && r.dirty(),
                c(f.value).then(()=>({
                    status: r.value,
                    value: f.value
                }))))
        }
        if (s.type === "transform")
            if (o.common.async === !1) {
                const c = this._def.schema._parseSync({
                    data: o.data,
                    path: o.path,
                    parent: o
                });
                if (!pi(c))
                    return c;
                const f = s.transform(c.value, l);
                if (f instanceof Promise)
                    throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
                return {
                    status: r.value,
                    value: f
                }
            } else
                return this._def.schema._parseAsync({
                    data: o.data,
                    path: o.path,
                    parent: o
                }).then(c=>pi(c) ? Promise.resolve(s.transform(c.value, l)).then(f=>({
                    status: r.value,
                    value: f
                })) : c);
        Te.assertNever(s)
    }
}
Vt.create = (n,i,r)=>new Vt({
    schema: n,
    typeName: le.ZodEffects,
    effect: i,
    ...ve(r)
});
Vt.createWithPreprocess = (n,i,r)=>new Vt({
    schema: i,
    effect: {
        type: "preprocess",
        transform: n
    },
    typeName: le.ZodEffects,
    ...ve(r)
});
class gn extends be {
    _parse(i) {
        return this._getType(i) === J.undefined ? lt(void 0) : this._def.innerType._parse(i)
    }
    unwrap() {
        return this._def.innerType
    }
}
gn.create = (n,i)=>new gn({
    innerType: n,
    typeName: le.ZodOptional,
    ...ve(i)
});
class ar extends be {
    _parse(i) {
        return this._getType(i) === J.null ? lt(null) : this._def.innerType._parse(i)
    }
    unwrap() {
        return this._def.innerType
    }
}
ar.create = (n,i)=>new ar({
    innerType: n,
    typeName: le.ZodNullable,
    ...ve(i)
});
class ki extends be {
    _parse(i) {
        const {ctx: r} = this._processInputParams(i);
        let o = r.data;
        return r.parsedType === J.undefined && (o = this._def.defaultValue()),
        this._def.innerType._parse({
            data: o,
            path: r.path,
            parent: r
        })
    }
    removeDefault() {
        return this._def.innerType
    }
}
ki.create = (n,i)=>new ki({
    innerType: n,
    typeName: le.ZodDefault,
    defaultValue: typeof i.default == "function" ? i.default : ()=>i.default,
    ...ve(i)
});
class La extends be {
    _parse(i) {
        const {ctx: r} = this._processInputParams(i)
          , o = {
            ...r,
            common: {
                ...r.common,
                issues: []
            }
        }
          , s = this._def.innerType._parse({
            data: o.data,
            path: o.path,
            parent: {
                ...o
            }
        });
        return Ma(s) ? s.then(l=>({
            status: "valid",
            value: l.status === "valid" ? l.value : this._def.catchValue({
                get error() {
                    return new Ft(o.common.issues)
                },
                input: o.data
            })
        })) : {
            status: "valid",
            value: s.status === "valid" ? s.value : this._def.catchValue({
                get error() {
                    return new Ft(o.common.issues)
                },
                input: o.data
            })
        }
    }
    removeCatch() {
        return this._def.innerType
    }
}
La.create = (n,i)=>new La({
    innerType: n,
    typeName: le.ZodCatch,
    catchValue: typeof i.catch == "function" ? i.catch : ()=>i.catch,
    ...ve(i)
});
class Ia extends be {
    _parse(i) {
        if (this._getType(i) !== J.nan) {
            const r = this._getOrReturnCtx(i);
            return ee(r, {
                code: q.invalid_type,
                expected: J.nan,
                received: r.parsedType
            }),
            he
        }
        return {
            status: "valid",
            value: i.data
        }
    }
}
Ia.create = n=>new Ia({
    typeName: le.ZodNaN,
    ...ve(n)
});
const V_ = Symbol("zod_brand");
class hd extends be {
    _parse(i) {
        const {ctx: r} = this._processInputParams(i)
          , o = r.data;
        return this._def.type._parse({
            data: o,
            path: r.path,
            parent: r
        })
    }
    unwrap() {
        return this._def.type
    }
}
class Ei extends be {
    _parse(i) {
        const {status: r, ctx: o} = this._processInputParams(i);
        if (o.common.async)
            return (async()=>{
                const s = await this._def.in._parseAsync({
                    data: o.data,
                    path: o.path,
                    parent: o
                });
                return s.status === "aborted" ? he : s.status === "dirty" ? (r.dirty(),
                fd(s.value)) : this._def.out._parseAsync({
                    data: s.value,
                    path: o.path,
                    parent: o
                })
            }
            )();
        {
            const s = this._def.in._parseSync({
                data: o.data,
                path: o.path,
                parent: o
            });
            return s.status === "aborted" ? he : s.status === "dirty" ? (r.dirty(),
            {
                status: "dirty",
                value: s.value
            }) : this._def.out._parseSync({
                data: s.value,
                path: o.path,
                parent: o
            })
        }
    }
    static create(i, r) {
        return new Ei({
            in: i,
            out: r,
            typeName: le.ZodPipeline
        })
    }
}
class Da extends be {
    _parse(i) {
        const r = this._def.innerType._parse(i);
        return pi(r) && (r.value = Object.freeze(r.value)),
        r
    }
}
Da.create = (n,i)=>new Da({
    innerType: n,
    typeName: le.ZodReadonly,
    ...ve(i)
});
const vd = (n,i={},r)=>n ? Mr.create().superRefine((o,s)=>{
    var l, c;
    if (!n(o)) {
        const f = typeof i == "function" ? i(o) : typeof i == "string" ? {
            message: i
        } : i
          , v = (c = (l = f.fatal) !== null && l !== void 0 ? l : r) !== null && c !== void 0 ? c : !0
          , g = typeof f == "string" ? {
            message: f
        } : f;
        s.addIssue({
            code: "custom",
            ...g,
            fatal: v
        })
    }
}
) : Mr.create()
  , U_ = {
    object: De.lazycreate
};
var le;
(function(n) {
    n.ZodString = "ZodString",
    n.ZodNumber = "ZodNumber",
    n.ZodNaN = "ZodNaN",
    n.ZodBigInt = "ZodBigInt",
    n.ZodBoolean = "ZodBoolean",
    n.ZodDate = "ZodDate",
    n.ZodSymbol = "ZodSymbol",
    n.ZodUndefined = "ZodUndefined",
    n.ZodNull = "ZodNull",
    n.ZodAny = "ZodAny",
    n.ZodUnknown = "ZodUnknown",
    n.ZodNever = "ZodNever",
    n.ZodVoid = "ZodVoid",
    n.ZodArray = "ZodArray",
    n.ZodObject = "ZodObject",
    n.ZodUnion = "ZodUnion",
    n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    n.ZodIntersection = "ZodIntersection",
    n.ZodTuple = "ZodTuple",
    n.ZodRecord = "ZodRecord",
    n.ZodMap = "ZodMap",
    n.ZodSet = "ZodSet",
    n.ZodFunction = "ZodFunction",
    n.ZodLazy = "ZodLazy",
    n.ZodLiteral = "ZodLiteral",
    n.ZodEnum = "ZodEnum",
    n.ZodEffects = "ZodEffects",
    n.ZodNativeEnum = "ZodNativeEnum",
    n.ZodOptional = "ZodOptional",
    n.ZodNullable = "ZodNullable",
    n.ZodDefault = "ZodDefault",
    n.ZodCatch = "ZodCatch",
    n.ZodPromise = "ZodPromise",
    n.ZodBranded = "ZodBranded",
    n.ZodPipeline = "ZodPipeline",
    n.ZodReadonly = "ZodReadonly"
}
)(le || (le = {}));
const q_ = (n,i={
    message: `Input not instance of ${n.name}`
})=>vd(r=>r instanceof n, i)
  , gd = Rt.create
  , md = Ln.create
  , H_ = Ia.create
  , K_ = In.create
  , yd = hi.create
  , Y_ = rr.create
  , X_ = Na.create
  , J_ = vi.create
  , Q_ = gi.create
  , G_ = Mr.create
  , e0 = tr.create
  , t0 = mn.create
  , n0 = za.create
  , r0 = Wt.create
  , i0 = De.create
  , a0 = De.strictCreate
  , o0 = mi.create
  , s0 = qa.create
  , u0 = yi.create
  , l0 = Qt.create
  , c0 = bi.create
  , d0 = Ba.create
  , f0 = ir.create
  , p0 = Er.create
  , h0 = _i.create
  , v0 = xi.create
  , g0 = Dn.create
  , m0 = wi.create
  , y0 = Nr.create
  , Bc = Vt.create
  , b0 = gn.create
  , _0 = ar.create
  , x0 = Vt.createWithPreprocess
  , w0 = Ei.create
  , k0 = ()=>gd().optional()
  , S0 = ()=>md().optional()
  , O0 = ()=>yd().optional()
  , $0 = {
    string: n=>Rt.create({
        ...n,
        coerce: !0
    }),
    number: n=>Ln.create({
        ...n,
        coerce: !0
    }),
    boolean: n=>hi.create({
        ...n,
        coerce: !0
    }),
    bigint: n=>In.create({
        ...n,
        coerce: !0
    }),
    date: n=>rr.create({
        ...n,
        coerce: !0
    })
}
  , T0 = he;
var zs = Object.freeze({
    __proto__: null,
    defaultErrorMap: fi,
    setErrorMap: C_,
    getErrorMap: Ca,
    makeIssue: Pa,
    EMPTY_PATH: P_,
    addIssueToContext: ee,
    ParseStatus: nt,
    INVALID: he,
    DIRTY: fd,
    OK: lt,
    isAborted: Ps,
    isDirty: Ms,
    isValid: pi,
    isAsync: Ma,
    get util() {
        return Te
    },
    get objectUtil() {
        return Cs
    },
    ZodParsedType: J,
    getParsedType: Mn,
    ZodType: be,
    ZodString: Rt,
    ZodNumber: Ln,
    ZodBigInt: In,
    ZodBoolean: hi,
    ZodDate: rr,
    ZodSymbol: Na,
    ZodUndefined: vi,
    ZodNull: gi,
    ZodAny: Mr,
    ZodUnknown: tr,
    ZodNever: mn,
    ZodVoid: za,
    ZodArray: Wt,
    ZodObject: De,
    ZodUnion: mi,
    ZodDiscriminatedUnion: qa,
    ZodIntersection: yi,
    ZodTuple: Qt,
    ZodRecord: bi,
    ZodMap: Ba,
    ZodSet: ir,
    ZodFunction: Er,
    ZodLazy: _i,
    ZodLiteral: xi,
    ZodEnum: Dn,
    ZodNativeEnum: wi,
    ZodPromise: Nr,
    ZodEffects: Vt,
    ZodTransformer: Vt,
    ZodOptional: gn,
    ZodNullable: ar,
    ZodDefault: ki,
    ZodCatch: La,
    ZodNaN: Ia,
    BRAND: V_,
    ZodBranded: hd,
    ZodPipeline: Ei,
    ZodReadonly: Da,
    custom: vd,
    Schema: be,
    ZodSchema: be,
    late: U_,
    get ZodFirstPartyTypeKind() {
        return le
    },
    coerce: $0,
    any: G_,
    array: r0,
    bigint: K_,
    boolean: yd,
    date: Y_,
    discriminatedUnion: s0,
    effect: Bc,
    enum: g0,
    function: p0,
    instanceof: q_,
    intersection: u0,
    lazy: h0,
    literal: v0,
    map: d0,
    nan: H_,
    nativeEnum: m0,
    never: t0,
    null: Q_,
    nullable: _0,
    number: md,
    object: i0,
    oboolean: O0,
    onumber: S0,
    optional: b0,
    ostring: k0,
    pipeline: w0,
    preprocess: x0,
    promise: y0,
    record: c0,
    set: f0,
    strictObject: a0,
    string: gd,
    symbol: X_,
    transformer: Bc,
    tuple: l0,
    undefined: J_,
    union: o0,
    unknown: e0,
    void: n0,
    NEVER: T0,
    ZodIssueCode: q,
    quotelessJson: A_,
    ZodError: Ft
});
const j0 = ["onSubmit"]
  , sw = Object.assign({
    name: "BcForm"
}, {
    __name: "index",
    props: {
        actionBarProps: {
            type: Object
        },
        classes: {
            type: Object,
            default: ()=>({
                base: ""
            })
        },
        form: {
            type: Object,
            default: ()=>{}
        },
        hasActionBar: {
            type: Boolean,
            default: !0
        },
        resetValues: {
            type: Object,
            default: ()=>{}
        },
        rules: {
            type: Object,
            default: ()=>{}
        },
        showMessage: {
            type: Boolean,
            default: !0
        },
        size: {
            type: String,
            default: "default"
        }
    },
    emits: ["submit", "validate-failed", "validate-passed"],
    setup(n, {expose: i, emit: r}) {
        const o = n
          , s = sd("form-event")
          , l = Se([])
          , c = Se(null);
        Lr("formContext", {
            rules: o.rules,
            showMessage: o.showMessage,
            size: o.size,
            error: l
        }),
        s.on(w=>{
            O(w.prop),
            w.relatedProps.forEach(P=>{
                O(P)
            }
            )
        }
        );
        const f = Ob({});
        ur(()=>{
            Object.assign(f, o.form)
        }
        );
        const v = ae(()=>Mt({
            slots: {
                base: "",
                action: "mt-6"
            }
        })())
          , g = ()=>{
            const w = y();
            r("submit", w, l.value),
            r(w ? "validate-passed" : "validate-failed")
        }
          , y = ()=>{
            var w;
            if (vn.isEmpty(o.rules))
                return !0;
            const P = c.value.querySelectorAll(".bc-form-item")
              , S = [];
            for (let j = 0; j < P.length; j++) {
                const H = P[j].getAttribute("data-prop");
                H && S.push(H)
            }
            const Z = {};
            S.forEach(j=>{
                Z[j] = o.rules[j]
            }
            );
            const I = zs.object(Z);
            try {
                return I.parse(o.form),
                l.value = [],
                !0
            } catch (j) {
                return console.log(j),
                (w = j.issues) != null && w.length && (l.value = j.issues),
                !1
            }
        }
          , O = w=>{
            if (vn.isEmpty(o.rules))
                return;
            if (!o.rules[w]) {
                console.warn(`The '${w}' field is missing a specific validation rule.`);
                return
            }
            const P = zs.object({
                [w]: o.rules[w]
            });
            try {
                P.parse({
                    [w]: o.form[w]
                }),
                l.value = l.value.filter(S=>S.path[0] !== w)
            } catch (S) {
                l.value.find(Z=>Z.path[0] === w) || l.value.push(S.issues[0])
            }
        }
          , N = ()=>{
            vn.isEmpty(o.resetValues) ? Object.assign(o.form, f) : Object.assign(o.form, o.resetValues),
            k()
        }
          , k = ()=>{
            l.value = []
        }
        ;
        return i({
            resetForm: N,
            resetValidation: k,
            validate: y,
            validateField: O
        }),
        (w,P)=>(Ee(),
        Ze("form", {
            ref_key: "formRef",
            ref: c,
            class: $e([v.value.base({
                class: n.classes.base
            }), "bc-form"]),
            onSubmit: $b(g, ["prevent"])
        }, [qe(w.$slots, "default"), qe(w.$slots, "action-bar", {}, ()=>[n.hasActionBar ? (Ee(),
        zn(y_, Nn({
            key: 0
        }, {
            ...w.$attrs,
            ...n.actionBarProps
        }, {
            "confirm-button-type": "submit",
            classes: {
                base: v.value.action()
            },
            size: n.size
        }), null, 16, ["classes", "size"])) : ut("", !0)])], 42, j0))
    }
})
  , E0 = ["data-prop"]
  , uw = {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                label: "",
                content: "",
                error: ""
            })
        },
        label: {
            type: String
        },
        labelPosition: {
            type: String,
            values: ["top", "left"],
            default: "top"
        },
        prop: {
            type: String
        },
        relatedProps: {
            type: Array,
            default: ()=>[]
        },
        required: {
            type: Boolean,
            default: !1
        }
    },
    setup(n) {
        const i = n
          , r = Se("")
          , o = Bn("formContext")
          , s = Se(!1);
        Lr("formItem", {
            prop: i.prop || "",
            relatedProps: i.relatedProps,
            hasError: s
        }),
        jr(o.error, f=>{
            if (f.length) {
                const v = f.find(g=>g.path[0] === i.prop);
                r.value = v ? v.message : "",
                s.value = f.some(g=>g.path[0] === i.prop)
            } else
                r.value = "",
                s.value = !1
        }
        , {
            deep: !0
        });
        const l = ae(()=>{
            if (o.rules) {
                const f = zs.object(o.rules);
                return f.shape[i.prop] ? !f.shape[i.prop].isOptional() : !1
            } else
                return !1
        }
        )
          , c = ae(()=>Mt({
            slots: {
                base: "",
                label: "flex text-sm text-moderate",
                content: "relative",
                error: "mt-1 text-xs leading-none text-danger"
            },
            variants: {
                hasLabel: {
                    true: {
                        base: "mb-5"
                    }
                },
                labelPosition: {
                    top: {
                        label: "mb-2"
                    },
                    left: {
                        base: "flex items-start",
                        label: "mr-2 text-right leading-10"
                    }
                }
            }
        })({
            hasLabel: i.label !== "",
            labelPosition: i.labelPosition
        }));
        return (f,v)=>(Ee(),
        Ze("div", {
            class: $e([c.value.base({
                class: n.classes.base
            }), "bc-form-item", {
                "is-error": r.value !== ""
            }]),
            "data-prop": n.prop
        }, [n.label ? (Ee(),
        Ze("label", {
            key: 0,
            class: $e([c.value.label({
                class: n.classes.label
            }), "bc-form-item__label", {
                "is-required": n.required || l.value
            }])
        }, Pr(n.label), 3)) : ut("", !0), Ct("div", {
            class: $e([c.value.content({
                class: n.classes.content
            }), "bc-form-item__content"])
        }, [qe(f.$slots, "default"), Ge(o).showMessage && s.value ? (Ee(),
        Ze("div", {
            key: 0,
            class: $e([c.value.error({
                class: n.classes.error
            }), "bc-form-item__error"])
        }, Pr(r.value), 3)) : ut("", !0)], 2)], 10, E0))
    }
}
  , A0 = Object.assign({
    name: "BcIcon"
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: ""
            })
        },
        icon: {
            type: [String, Object],
            required: !0
        },
        iconProps: {
            type: Object
        }
    },
    setup(n) {
        const i = n
          , r = ae(()=>typeof i.icon == "object");
        return (o,s)=>r.value ? (Ee(),
        zn(Kc(n.icon), Nn({
            key: 0,
            class: ["bc-icon", n.classes.base]
        }, n.iconProps), null, 16, ["class"])) : (Ee(),
        Ze("i", {
            key: 1,
            class: $e([n.icon, "bc-icon", n.classes.base])
        }, null, 2))
    }
})
  , C0 = ["disabled", "readonly", "onKeyup"]
  , lw = Object.assign({
    name: "BcInput",
    inheritAttrs: !1
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                input: "",
                prefix: "",
                suffix: ""
            })
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        modelValue: {
            type: String,
            default: ""
        },
        prefixIcon: {
            type: String
        },
        prefixStyling: {
            type: Boolean,
            default: !1
        },
        readonly: {
            type: Boolean,
            default: !1
        },
        round: {
            type: Boolean,
            default: !1
        },
        size: {
            type: String,
            values: ["default", "xlarge", "large", "small", "xsmall"],
            default: "default"
        },
        suffixIcon: {
            type: String
        },
        suffixStyling: {
            type: Boolean,
            default: !1
        },
        variant: {
            type: String,
            values: ["default", "variant1"],
            default: "default"
        }
    },
    emits: ["blur", "change", "enter", "focus", "input", "keydown", "update:modelValue"],
    setup(n, {emit: i}) {
        const r = n
          , {formSize: o, isError: s, emitFormEvent: l} = ud(r)
          , c = ae(()=>Vs({
            slots: {
                base: "flex items-center transition",
                input: "h-full w-full min-w-0 text-strong placeholder:text-placeholder",
                prefix: "",
                suffix: ""
            },
            variants: {
                disabled: {
                    true: {
                        base: "cursor-not-allowed bg-base",
                        input: "cursor-not-allowed"
                    },
                    false: {
                        base: "bg-white"
                    }
                },
                prefixStyling: {
                    true: {
                        prefix: "border-r bg-base pr-3"
                    }
                },
                round: {
                    true: {
                        base: "rounded-full",
                        prefix: "rounded-s-full pl-4",
                        suffix: "rounded-e-full pr-4"
                    },
                    false: {
                        base: "rounded-base",
                        prefix: "rounded-s-base pl-3",
                        suffix: "rounded-e-base pr-3"
                    }
                },
                size: {
                    default: {
                        base: "h-default text-input",
                        input: "px-3"
                    },
                    xlarge: {
                        base: "h-xlarge text-input-large",
                        input: "px-5"
                    },
                    large: {
                        base: "h-large text-input-large",
                        input: "px-4"
                    },
                    small: {
                        base: "h-small text-input-small",
                        input: "px-3"
                    },
                    xsmall: {
                        base: "h-xsmall text-input-small",
                        input: "px-3"
                    }
                },
                suffixStyling: {
                    true: {
                        suffix: "border-l bg-base pl-3"
                    }
                },
                variant: {
                    default: {
                        base: "border border-base"
                    },
                    variant1: {
                        base: "border border-gray-300 shadow-sm"
                    }
                }
            },
            compoundSlots: [{
                slots: ["prefix", "suffix"],
                class: "flex h-full shrink-0 items-center text-subtle"
            }],
            compoundVariants: [{
                readonly: !1,
                disabled: !1,
                variant: "default",
                class: "focus-within:border-primary"
            }, {
                readonly: !1,
                disabled: !1,
                variant: "variant1",
                class: "focus-within:border-primary focus-within:ring focus-within:ring-primary-light"
            }, {
                isError: !0,
                class: "border-danger focus-within:border-danger"
            }]
        })({
            disabled: r.disabled,
            isError: s.value,
            prefixStyling: r.prefixStyling,
            readonly: r.readonly,
            round: r.round,
            size: o.value,
            suffixStyling: r.suffixStyling,
            variant: r.variant
        }))
          , f = ae({
            get() {
                return r.modelValue
            },
            set(w) {
                i("update:modelValue", w)
            }
        })
          , v = w=>{
            i("blur", w),
            l("blur")
        }
          , g = w=>{
            i("change", w.target.value)
        }
          , y = w=>{
            i("enter", w)
        }
          , O = w=>{
            i("focus", w)
        }
          , N = w=>{
            i("input", w.target.value)
        }
          , k = w=>{
            i("keydown", w)
        }
        ;
        return (w,P)=>(Ee(),
        Ze("div", {
            class: $e([c.value.base({
                class: n.classes.base
            }), "bc-input", w.$attrs.class])
        }, [w.$slots.prefix || n.prefixIcon ? (Ee(),
        Ze("div", {
            key: 0,
            class: $e([c.value.prefix({
                class: n.classes.prefix
            }), "bc-input__prefix"])
        }, [qe(w.$slots, "prefix", {}, ()=>[Ct("i", {
            class: $e([n.prefixIcon, "bc-input__prefix-icon"])
        }, null, 2)])], 2)) : ut("", !0), Uc(Ct("input", Nn({
            "onUpdate:modelValue": P[0] || (P[0] = S=>f.value = S),
            class: [c.value.input({
                class: n.classes.input
            }), "bc-input__input"]
        }, Ge(vn.omit)(w.$attrs, ["class", "style"]), {
            disabled: n.disabled,
            readonly: n.readonly,
            onBlur: v,
            onChange: g,
            onFocus: O,
            onInput: N,
            onKeydown: k,
            onKeyup: qc(y, ["enter"])
        }), null, 16, C0), [[Tb, f.value]]), w.$slots.suffix || n.suffixIcon ? (Ee(),
        Ze("div", {
            key: 1,
            class: $e([c.value.suffix({
                class: n.classes.suffix
            }), "bc-input__suffix"])
        }, [qe(w.$slots, "suffix", {}, ()=>[Ct("i", {
            class: $e([n.suffixIcon, "bc-input__suffix-icon"])
        }, null, 2)])], 2)) : ut("", !0)], 2))
    }
})
  , cw = Object.assign({
    name: "BcListItem"
}, {
    __name: "index",
    props: {
        as: {
            type: [String, Object],
            default: "div"
        },
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                icon: ""
            })
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        hoverable: {
            type: Boolean,
            default: !1
        },
        icon: {
            type: [String, Object]
        },
        iconClickable: {
            type: Boolean,
            default: !1
        },
        iconProps: {
            type: Object
        },
        label: {
            type: String
        },
        selected: {
            type: Boolean,
            default: !1
        }
    },
    emits: ["on-click-icon"],
    setup(n, {emit: i}) {
        const r = n
          , o = ae(()=>r.as === "a" || r.as === "router-link")
          , s = ae(()=>Mt({
            slots: {
                base: "flex h-9 items-center gap-2.5 rounded-base px-3 text-subtle transition",
                icon: "text-lg leading-none",
                label: "flex-1 text-sm font-bc-medium"
            },
            variants: {
                hoverable: {
                    true: {
                        base: "cursor-pointer hover:text-primary"
                    }
                },
                iconClickable: {
                    true: {
                        icon: "cursor-pointer transition hover:text-strong"
                    }
                },
                isLink: {
                    true: {
                        base: "hover:text-primary"
                    }
                },
                selected: {
                    true: {
                        base: "bg-primary-light text-primary"
                    }
                }
            }
        })({
            hoverable: r.hoverable,
            iconClickable: r.iconClickable,
            isLink: o.value,
            selected: r.selected
        }))
          , l = ()=>{
            r.iconClickable && i("on-click-icon")
        }
        ;
        return (c,f)=>(Ee(),
        zn(Kc(n.as), {
            class: $e([s.value.base({
                class: n.classes.base
            }), "bc-list-item"])
        }, {
            default: fn(()=>[n.icon ? (Ee(),
            zn(A0, {
                key: 0,
                class: $e([s.value.icon({
                    class: n.classes.icon
                }), "bc-list-item__icon"]),
                icon: n.icon,
                "icon-props": n.iconProps,
                onClick: l
            }, null, 8, ["class", "icon", "icon-props"])) : ut("", !0), Ct("span", {
                class: $e([s.value.label(), "bc-list-item__label"])
            }, Pr(n.label), 3), qe(c.$slots, "default")]),
            _: 3
        }, 8, ["class"]))
    }
})
  , zr = Math.min
  , nr = Math.max
  , Za = Math.round
  , Sa = Math.floor
  , Zn = n=>({
    x: n,
    y: n
})
  , P0 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
}
  , M0 = {
    start: "end",
    end: "start"
};
function Bs(n, i, r) {
    return nr(n, zr(i, r))
}
function Ai(n, i) {
    return typeof n == "function" ? n(i) : n
}
function or(n) {
    return n.split("-")[0]
}
function Ci(n) {
    return n.split("-")[1]
}
function bd(n) {
    return n === "x" ? "y" : "x"
}
function Us(n) {
    return n === "y" ? "height" : "width"
}
function Ha(n) {
    return ["top", "bottom"].includes(or(n)) ? "y" : "x"
}
function qs(n) {
    return bd(Ha(n))
}
function N0(n, i, r) {
    r === void 0 && (r = !1);
    const o = Ci(n)
      , s = qs(n)
      , l = Us(s);
    let c = s === "x" ? o === (r ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
    return i.reference[l] > i.floating[l] && (c = Ra(c)),
    [c, Ra(c)]
}
function z0(n) {
    const i = Ra(n);
    return [Ls(n), i, Ls(i)]
}
function Ls(n) {
    return n.replace(/start|end/g, i=>M0[i])
}
function B0(n, i, r) {
    const o = ["left", "right"]
      , s = ["right", "left"]
      , l = ["top", "bottom"]
      , c = ["bottom", "top"];
    switch (n) {
    case "top":
    case "bottom":
        return r ? i ? s : o : i ? o : s;
    case "left":
    case "right":
        return i ? l : c;
    default:
        return []
    }
}
function L0(n, i, r, o) {
    const s = Ci(n);
    let l = B0(or(n), r === "start", o);
    return s && (l = l.map(c=>c + "-" + s),
    i && (l = l.concat(l.map(Ls)))),
    l
}
function Ra(n) {
    return n.replace(/left|right|bottom|top/g, i=>P0[i])
}
function I0(n) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...n
    }
}
function _d(n) {
    return typeof n != "number" ? I0(n) : {
        top: n,
        right: n,
        bottom: n,
        left: n
    }
}
function Fa(n) {
    return {
        ...n,
        top: n.y,
        left: n.x,
        right: n.x + n.width,
        bottom: n.y + n.height
    }
}
function Lc(n, i, r) {
    let {reference: o, floating: s} = n;
    const l = Ha(i)
      , c = qs(i)
      , f = Us(c)
      , v = or(i)
      , g = l === "y"
      , y = o.x + o.width / 2 - s.width / 2
      , O = o.y + o.height / 2 - s.height / 2
      , N = o[f] / 2 - s[f] / 2;
    let k;
    switch (v) {
    case "top":
        k = {
            x: y,
            y: o.y - s.height
        };
        break;
    case "bottom":
        k = {
            x: y,
            y: o.y + o.height
        };
        break;
    case "right":
        k = {
            x: o.x + o.width,
            y: O
        };
        break;
    case "left":
        k = {
            x: o.x - s.width,
            y: O
        };
        break;
    default:
        k = {
            x: o.x,
            y: o.y
        }
    }
    switch (Ci(i)) {
    case "start":
        k[c] -= N * (r && g ? -1 : 1);
        break;
    case "end":
        k[c] += N * (r && g ? -1 : 1);
        break
    }
    return k
}
const D0 = async(n,i,r)=>{
    const {placement: o="bottom", strategy: s="absolute", middleware: l=[], platform: c} = r
      , f = l.filter(Boolean)
      , v = await (c.isRTL == null ? void 0 : c.isRTL(i));
    let g = await c.getElementRects({
        reference: n,
        floating: i,
        strategy: s
    })
      , {x: y, y: O} = Lc(g, o, v)
      , N = o
      , k = {}
      , w = 0;
    for (let P = 0; P < f.length; P++) {
        const {name: S, fn: Z} = f[P]
          , {x: I, y: j, data: H, reset: W} = await Z({
            x: y,
            y: O,
            initialPlacement: o,
            placement: N,
            strategy: s,
            middlewareData: k,
            rects: g,
            platform: c,
            elements: {
                reference: n,
                floating: i
            }
        });
        if (y = I ?? y,
        O = j ?? O,
        k = {
            ...k,
            [S]: {
                ...k[S],
                ...H
            }
        },
        W && w <= 50) {
            w++,
            typeof W == "object" && (W.placement && (N = W.placement),
            W.rects && (g = W.rects === !0 ? await c.getElementRects({
                reference: n,
                floating: i,
                strategy: s
            }) : W.rects),
            {x: y, y: O} = Lc(g, N, v)),
            P = -1;
            continue
        }
    }
    return {
        x: y,
        y: O,
        placement: N,
        strategy: s,
        middlewareData: k
    }
}
;
async function xd(n, i) {
    var r;
    i === void 0 && (i = {});
    const {x: o, y: s, platform: l, rects: c, elements: f, strategy: v} = n
      , {boundary: g="clippingAncestors", rootBoundary: y="viewport", elementContext: O="floating", altBoundary: N=!1, padding: k=0} = Ai(i, n)
      , w = _d(k)
      , P = f[N ? O === "floating" ? "reference" : "floating" : O]
      , S = Fa(await l.getClippingRect({
        element: (r = await (l.isElement == null ? void 0 : l.isElement(P))) == null || r ? P : P.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(f.floating)),
        boundary: g,
        rootBoundary: y,
        strategy: v
    }))
      , Z = O === "floating" ? {
        ...c.floating,
        x: o,
        y: s
    } : c.reference
      , I = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(f.floating))
      , j = await (l.isElement == null ? void 0 : l.isElement(I)) ? await (l.getScale == null ? void 0 : l.getScale(I)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    }
      , H = Fa(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: Z,
        offsetParent: I,
        strategy: v
    }) : Z);
    return {
        top: (S.top - H.top + w.top) / j.y,
        bottom: (H.bottom - S.bottom + w.bottom) / j.y,
        left: (S.left - H.left + w.left) / j.x,
        right: (H.right - S.right + w.right) / j.x
    }
}
const Z0 = n=>({
    name: "arrow",
    options: n,
    async fn(i) {
        const {x: r, y: o, placement: s, rects: l, platform: c, elements: f, middlewareData: v} = i
          , {element: g, padding: y=0} = Ai(n, i) || {};
        if (g == null)
            return {};
        const O = _d(y)
          , N = {
            x: r,
            y: o
        }
          , k = qs(s)
          , w = Us(k)
          , P = await c.getDimensions(g)
          , S = k === "y"
          , Z = S ? "top" : "left"
          , I = S ? "bottom" : "right"
          , j = S ? "clientHeight" : "clientWidth"
          , H = l.reference[w] + l.reference[k] - N[k] - l.floating[w]
          , W = N[k] - l.reference[k]
          , V = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(g));
        let T = V ? V[j] : 0;
        (!T || !await (c.isElement == null ? void 0 : c.isElement(V))) && (T = f.floating[j] || l.floating[w]);
        const L = H / 2 - W / 2
          , Q = T / 2 - P[w] / 2 - 1
          , ne = zr(O[Z], Q)
          , Y = zr(O[I], Q)
          , U = ne
          , D = T - P[w] - Y
          , E = T / 2 - P[w] / 2 + L
          , C = Bs(U, E, D)
          , F = !v.arrow && Ci(s) != null && E != C && l.reference[w] / 2 - (E < U ? ne : Y) - P[w] / 2 < 0
          , B = F ? E < U ? E - U : E - D : 0;
        return {
            [k]: N[k] + B,
            data: {
                [k]: C,
                centerOffset: E - C - B,
                ...F && {
                    alignmentOffset: B
                }
            },
            reset: F
        }
    }
})
  , R0 = function(n) {
    return n === void 0 && (n = {}),
    {
        name: "flip",
        options: n,
        async fn(i) {
            var r, o;
            const {placement: s, middlewareData: l, rects: c, initialPlacement: f, platform: v, elements: g} = i
              , {mainAxis: y=!0, crossAxis: O=!0, fallbackPlacements: N, fallbackStrategy: k="bestFit", fallbackAxisSideDirection: w="none", flipAlignment: P=!0, ...S} = Ai(n, i);
            if ((r = l.arrow) != null && r.alignmentOffset)
                return {};
            const Z = or(s)
              , I = or(f) === f
              , j = await (v.isRTL == null ? void 0 : v.isRTL(g.floating))
              , H = N || (I || !P ? [Ra(f)] : z0(f));
            !N && w !== "none" && H.push(...L0(f, P, w, j));
            const W = [f, ...H]
              , V = await xd(i, S)
              , T = [];
            let L = ((o = l.flip) == null ? void 0 : o.overflows) || [];
            if (y && T.push(V[Z]),
            O) {
                const U = N0(s, c, j);
                T.push(V[U[0]], V[U[1]])
            }
            if (L = [...L, {
                placement: s,
                overflows: T
            }],
            !T.every(U=>U <= 0)) {
                var Q, ne;
                const U = (((Q = l.flip) == null ? void 0 : Q.index) || 0) + 1
                  , D = W[U];
                if (D)
                    return {
                        data: {
                            index: U,
                            overflows: L
                        },
                        reset: {
                            placement: D
                        }
                    };
                let E = (ne = L.filter(C=>C.overflows[0] <= 0).sort((C,F)=>C.overflows[1] - F.overflows[1])[0]) == null ? void 0 : ne.placement;
                if (!E)
                    switch (k) {
                    case "bestFit":
                        {
                            var Y;
                            const C = (Y = L.map(F=>[F.placement, F.overflows.filter(B=>B > 0).reduce((B,K)=>B + K, 0)]).sort((F,B)=>F[1] - B[1])[0]) == null ? void 0 : Y[0];
                            C && (E = C);
                            break
                        }
                    case "initialPlacement":
                        E = f;
                        break
                    }
                if (s !== E)
                    return {
                        reset: {
                            placement: E
                        }
                    }
            }
            return {}
        }
    }
};
async function F0(n, i) {
    const {placement: r, platform: o, elements: s} = n
      , l = await (o.isRTL == null ? void 0 : o.isRTL(s.floating))
      , c = or(r)
      , f = Ci(r)
      , v = Ha(r) === "y"
      , g = ["left", "top"].includes(c) ? -1 : 1
      , y = l && v ? -1 : 1
      , O = Ai(i, n);
    let {mainAxis: N, crossAxis: k, alignmentAxis: w} = typeof O == "number" ? {
        mainAxis: O,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: 0,
        crossAxis: 0,
        alignmentAxis: null,
        ...O
    };
    return f && typeof w == "number" && (k = f === "end" ? w * -1 : w),
    v ? {
        x: k * y,
        y: N * g
    } : {
        x: N * g,
        y: k * y
    }
}
const W0 = function(n) {
    return n === void 0 && (n = 0),
    {
        name: "offset",
        options: n,
        async fn(i) {
            const {x: r, y: o} = i
              , s = await F0(i, n);
            return {
                x: r + s.x,
                y: o + s.y,
                data: s
            }
        }
    }
}
  , V0 = function(n) {
    return n === void 0 && (n = {}),
    {
        name: "shift",
        options: n,
        async fn(i) {
            const {x: r, y: o, placement: s} = i
              , {mainAxis: l=!0, crossAxis: c=!1, limiter: f={
                fn: S=>{
                    let {x: Z, y: I} = S;
                    return {
                        x: Z,
                        y: I
                    }
                }
            }, ...v} = Ai(n, i)
              , g = {
                x: r,
                y: o
            }
              , y = await xd(i, v)
              , O = Ha(or(s))
              , N = bd(O);
            let k = g[N]
              , w = g[O];
            if (l) {
                const S = N === "y" ? "top" : "left"
                  , Z = N === "y" ? "bottom" : "right"
                  , I = k + y[S]
                  , j = k - y[Z];
                k = Bs(I, k, j)
            }
            if (c) {
                const S = O === "y" ? "top" : "left"
                  , Z = O === "y" ? "bottom" : "right"
                  , I = w + y[S]
                  , j = w - y[Z];
                w = Bs(I, w, j)
            }
            const P = f.fn({
                ...i,
                [N]: k,
                [O]: w
            });
            return {
                ...P,
                data: {
                    x: P.x - r,
                    y: P.y - o
                }
            }
        }
    }
};
function Rn(n) {
    return wd(n) ? (n.nodeName || "").toLowerCase() : "#document"
}
function xt(n) {
    var i;
    return (n == null || (i = n.ownerDocument) == null ? void 0 : i.defaultView) || window
}
function _n(n) {
    var i;
    return (i = (wd(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : i.documentElement
}
function wd(n) {
    return n instanceof Node || n instanceof xt(n).Node
}
function yn(n) {
    return n instanceof Element || n instanceof xt(n).Element
}
function Gt(n) {
    return n instanceof HTMLElement || n instanceof xt(n).HTMLElement
}
function Ic(n) {
    return typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof xt(n).ShadowRoot
}
function Pi(n) {
    const {overflow: i, overflowX: r, overflowY: o, display: s} = Pt(n);
    return /auto|scroll|overlay|hidden|clip/.test(i + o + r) && !["inline", "contents"].includes(s)
}
function U0(n) {
    return ["table", "td", "th"].includes(Rn(n))
}
function Hs(n) {
    const i = Ks()
      , r = Pt(n);
    return r.transform !== "none" || r.perspective !== "none" || (r.containerType ? r.containerType !== "normal" : !1) || !i && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !i && (r.filter ? r.filter !== "none" : !1) || ["transform", "perspective", "filter"].some(o=>(r.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some(o=>(r.contain || "").includes(o))
}
function q0(n) {
    let i = Br(n);
    for (; Gt(i) && !Ka(i); ) {
        if (Hs(i))
            return i;
        i = Br(i)
    }
    return null
}
function Ks() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
function Ka(n) {
    return ["html", "body", "#document"].includes(Rn(n))
}
function Pt(n) {
    return xt(n).getComputedStyle(n)
}
function Ya(n) {
    return yn(n) ? {
        scrollLeft: n.scrollLeft,
        scrollTop: n.scrollTop
    } : {
        scrollLeft: n.pageXOffset,
        scrollTop: n.pageYOffset
    }
}
function Br(n) {
    if (Rn(n) === "html")
        return n;
    const i = n.assignedSlot || n.parentNode || Ic(n) && n.host || _n(n);
    return Ic(i) ? i.host : i
}
function kd(n) {
    const i = Br(n);
    return Ka(i) ? n.ownerDocument ? n.ownerDocument.body : n.body : Gt(i) && Pi(i) ? i : kd(i)
}
function Si(n, i, r) {
    var o;
    i === void 0 && (i = []),
    r === void 0 && (r = !0);
    const s = kd(n)
      , l = s === ((o = n.ownerDocument) == null ? void 0 : o.body)
      , c = xt(s);
    return l ? i.concat(c, c.visualViewport || [], Pi(s) ? s : [], c.frameElement && r ? Si(c.frameElement) : []) : i.concat(s, Si(s, [], r))
}
function Sd(n) {
    const i = Pt(n);
    let r = parseFloat(i.width) || 0
      , o = parseFloat(i.height) || 0;
    const s = Gt(n)
      , l = s ? n.offsetWidth : r
      , c = s ? n.offsetHeight : o
      , f = Za(r) !== l || Za(o) !== c;
    return f && (r = l,
    o = c),
    {
        width: r,
        height: o,
        $: f
    }
}
function Ys(n) {
    return yn(n) ? n : n.contextElement
}
function Ar(n) {
    const i = Ys(n);
    if (!Gt(i))
        return Zn(1);
    const r = i.getBoundingClientRect()
      , {width: o, height: s, $: l} = Sd(i);
    let c = (l ? Za(r.width) : r.width) / o
      , f = (l ? Za(r.height) : r.height) / s;
    return (!c || !Number.isFinite(c)) && (c = 1),
    (!f || !Number.isFinite(f)) && (f = 1),
    {
        x: c,
        y: f
    }
}
const H0 = Zn(0);
function Od(n) {
    const i = xt(n);
    return !Ks() || !i.visualViewport ? H0 : {
        x: i.visualViewport.offsetLeft,
        y: i.visualViewport.offsetTop
    }
}
function K0(n, i, r) {
    return i === void 0 && (i = !1),
    !r || i && r !== xt(n) ? !1 : i
}
function sr(n, i, r, o) {
    i === void 0 && (i = !1),
    r === void 0 && (r = !1);
    const s = n.getBoundingClientRect()
      , l = Ys(n);
    let c = Zn(1);
    i && (o ? yn(o) && (c = Ar(o)) : c = Ar(n));
    const f = K0(l, r, o) ? Od(l) : Zn(0);
    let v = (s.left + f.x) / c.x
      , g = (s.top + f.y) / c.y
      , y = s.width / c.x
      , O = s.height / c.y;
    if (l) {
        const N = xt(l)
          , k = o && yn(o) ? xt(o) : o;
        let w = N.frameElement;
        for (; w && o && k !== N; ) {
            const P = Ar(w)
              , S = w.getBoundingClientRect()
              , Z = Pt(w)
              , I = S.left + (w.clientLeft + parseFloat(Z.paddingLeft)) * P.x
              , j = S.top + (w.clientTop + parseFloat(Z.paddingTop)) * P.y;
            v *= P.x,
            g *= P.y,
            y *= P.x,
            O *= P.y,
            v += I,
            g += j,
            w = xt(w).frameElement
        }
    }
    return Fa({
        width: y,
        height: O,
        x: v,
        y: g
    })
}
function Y0(n) {
    let {rect: i, offsetParent: r, strategy: o} = n;
    const s = Gt(r)
      , l = _n(r);
    if (r === l)
        return i;
    let c = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , f = Zn(1);
    const v = Zn(0);
    if ((s || !s && o !== "fixed") && ((Rn(r) !== "body" || Pi(l)) && (c = Ya(r)),
    Gt(r))) {
        const g = sr(r);
        f = Ar(r),
        v.x = g.x + r.clientLeft,
        v.y = g.y + r.clientTop
    }
    return {
        width: i.width * f.x,
        height: i.height * f.y,
        x: i.x * f.x - c.scrollLeft * f.x + v.x,
        y: i.y * f.y - c.scrollTop * f.y + v.y
    }
}
function X0(n) {
    return Array.from(n.getClientRects())
}
function $d(n) {
    return sr(_n(n)).left + Ya(n).scrollLeft
}
function J0(n) {
    const i = _n(n)
      , r = Ya(n)
      , o = n.ownerDocument.body
      , s = nr(i.scrollWidth, i.clientWidth, o.scrollWidth, o.clientWidth)
      , l = nr(i.scrollHeight, i.clientHeight, o.scrollHeight, o.clientHeight);
    let c = -r.scrollLeft + $d(n);
    const f = -r.scrollTop;
    return Pt(o).direction === "rtl" && (c += nr(i.clientWidth, o.clientWidth) - s),
    {
        width: s,
        height: l,
        x: c,
        y: f
    }
}
function Q0(n, i) {
    const r = xt(n)
      , o = _n(n)
      , s = r.visualViewport;
    let l = o.clientWidth
      , c = o.clientHeight
      , f = 0
      , v = 0;
    if (s) {
        l = s.width,
        c = s.height;
        const g = Ks();
        (!g || g && i === "fixed") && (f = s.offsetLeft,
        v = s.offsetTop)
    }
    return {
        width: l,
        height: c,
        x: f,
        y: v
    }
}
function G0(n, i) {
    const r = sr(n, !0, i === "fixed")
      , o = r.top + n.clientTop
      , s = r.left + n.clientLeft
      , l = Gt(n) ? Ar(n) : Zn(1)
      , c = n.clientWidth * l.x
      , f = n.clientHeight * l.y
      , v = s * l.x
      , g = o * l.y;
    return {
        width: c,
        height: f,
        x: v,
        y: g
    }
}
function Dc(n, i, r) {
    let o;
    if (i === "viewport")
        o = Q0(n, r);
    else if (i === "document")
        o = J0(_n(n));
    else if (yn(i))
        o = G0(i, r);
    else {
        const s = Od(n);
        o = {
            ...i,
            x: i.x - s.x,
            y: i.y - s.y
        }
    }
    return Fa(o)
}
function Td(n, i) {
    const r = Br(n);
    return r === i || !yn(r) || Ka(r) ? !1 : Pt(r).position === "fixed" || Td(r, i)
}
function ex(n, i) {
    const r = i.get(n);
    if (r)
        return r;
    let o = Si(n, [], !1).filter(f=>yn(f) && Rn(f) !== "body")
      , s = null;
    const l = Pt(n).position === "fixed";
    let c = l ? Br(n) : n;
    for (; yn(c) && !Ka(c); ) {
        const f = Pt(c)
          , v = Hs(c);
        !v && f.position === "fixed" && (s = null),
        (l ? !v && !s : !v && f.position === "static" && s && ["absolute", "fixed"].includes(s.position) || Pi(c) && !v && Td(n, c)) ? o = o.filter(g=>g !== c) : s = f,
        c = Br(c)
    }
    return i.set(n, o),
    o
}
function tx(n) {
    let {element: i, boundary: r, rootBoundary: o, strategy: s} = n;
    const l = [...r === "clippingAncestors" ? ex(i, this._c) : [].concat(r), o]
      , c = l[0]
      , f = l.reduce((v,g)=>{
        const y = Dc(i, g, s);
        return v.top = nr(y.top, v.top),
        v.right = zr(y.right, v.right),
        v.bottom = zr(y.bottom, v.bottom),
        v.left = nr(y.left, v.left),
        v
    }
    , Dc(i, c, s));
    return {
        width: f.right - f.left,
        height: f.bottom - f.top,
        x: f.left,
        y: f.top
    }
}
function nx(n) {
    return Sd(n)
}
function rx(n, i, r) {
    const o = Gt(i)
      , s = _n(i)
      , l = r === "fixed"
      , c = sr(n, !0, l, i);
    let f = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const v = Zn(0);
    if (o || !o && !l)
        if ((Rn(i) !== "body" || Pi(s)) && (f = Ya(i)),
        o) {
            const g = sr(i, !0, l, i);
            v.x = g.x + i.clientLeft,
            v.y = g.y + i.clientTop
        } else
            s && (v.x = $d(s));
    return {
        x: c.left + f.scrollLeft - v.x,
        y: c.top + f.scrollTop - v.y,
        width: c.width,
        height: c.height
    }
}
function Zc(n, i) {
    return !Gt(n) || Pt(n).position === "fixed" ? null : i ? i(n) : n.offsetParent
}
function jd(n, i) {
    const r = xt(n);
    if (!Gt(n))
        return r;
    let o = Zc(n, i);
    for (; o && U0(o) && Pt(o).position === "static"; )
        o = Zc(o, i);
    return o && (Rn(o) === "html" || Rn(o) === "body" && Pt(o).position === "static" && !Hs(o)) ? r : o || q0(n) || r
}
const ix = async function(n) {
    let {reference: i, floating: r, strategy: o} = n;
    const s = this.getOffsetParent || jd
      , l = this.getDimensions;
    return {
        reference: rx(i, await s(r), o),
        floating: {
            x: 0,
            y: 0,
            ...await l(r)
        }
    }
};
function ax(n) {
    return Pt(n).direction === "rtl"
}
const ox = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Y0,
    getDocumentElement: _n,
    getClippingRect: tx,
    getOffsetParent: jd,
    getElementRects: ix,
    getClientRects: X0,
    getDimensions: nx,
    getScale: Ar,
    isElement: yn,
    isRTL: ax
};
function sx(n, i) {
    let r = null, o;
    const s = _n(n);
    function l() {
        clearTimeout(o),
        r && r.disconnect(),
        r = null
    }
    function c(f, v) {
        f === void 0 && (f = !1),
        v === void 0 && (v = 1),
        l();
        const {left: g, top: y, width: O, height: N} = n.getBoundingClientRect();
        if (f || i(),
        !O || !N)
            return;
        const k = Sa(y)
          , w = Sa(s.clientWidth - (g + O))
          , P = Sa(s.clientHeight - (y + N))
          , S = Sa(g)
          , Z = {
            rootMargin: -k + "px " + -w + "px " + -P + "px " + -S + "px",
            threshold: nr(0, zr(1, v)) || 1
        };
        let I = !0;
        function j(H) {
            const W = H[0].intersectionRatio;
            if (W !== v) {
                if (!I)
                    return c();
                W ? c(!1, W) : o = setTimeout(()=>{
                    c(!1, 1e-7)
                }
                , 100)
            }
            I = !1
        }
        try {
            r = new IntersectionObserver(j,{
                ...Z,
                root: s.ownerDocument
            })
        } catch {
            r = new IntersectionObserver(j,Z)
        }
        r.observe(n)
    }
    return c(!0),
    l
}
function ux(n, i, r, o) {
    o === void 0 && (o = {});
    const {ancestorScroll: s=!0, ancestorResize: l=!0, elementResize: c=typeof ResizeObserver == "function", layoutShift: f=typeof IntersectionObserver == "function", animationFrame: v=!1} = o
      , g = Ys(n)
      , y = s || l ? [...g ? Si(g) : [], ...Si(i)] : [];
    y.forEach(Z=>{
        s && Z.addEventListener("scroll", r, {
            passive: !0
        }),
        l && Z.addEventListener("resize", r)
    }
    );
    const O = g && f ? sx(g, r) : null;
    let N = -1
      , k = null;
    c && (k = new ResizeObserver(Z=>{
        let[I] = Z;
        I && I.target === g && k && (k.unobserve(i),
        cancelAnimationFrame(N),
        N = requestAnimationFrame(()=>{
            k && k.observe(i)
        }
        )),
        r()
    }
    ),
    g && !v && k.observe(g),
    k.observe(i));
    let w, P = v ? sr(n) : null;
    v && S();
    function S() {
        const Z = sr(n);
        P && (Z.x !== P.x || Z.y !== P.y || Z.width !== P.width || Z.height !== P.height) && r(),
        P = Z,
        w = requestAnimationFrame(S)
    }
    return r(),
    ()=>{
        y.forEach(Z=>{
            s && Z.removeEventListener("scroll", r),
            l && Z.removeEventListener("resize", r)
        }
        ),
        O && O(),
        k && k.disconnect(),
        k = null,
        v && cancelAnimationFrame(w)
    }
}
const lx = (n,i,r)=>{
    const o = new Map
      , s = {
        platform: ox,
        ...r
    }
      , l = {
        ...s.platform,
        _c: o
    };
    return D0(n, i, {
        ...s,
        platform: l
    })
}
;
function Is(n) {
    var i;
    return (i = n == null ? void 0 : n.$el) != null ? i : n
}
function cx(n) {
    return {
        name: "arrow",
        options: n,
        fn(i) {
            const r = Is(Ge(n.element));
            return r == null ? {} : Z0({
                element: r,
                padding: n.padding
            }).fn(i)
        }
    }
}
function Ed(n) {
    return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function Rc(n, i) {
    const r = Ed(n);
    return Math.round(i * r) / r
}
function dx(n, i, r) {
    r === void 0 && (r = {});
    const o = r.whileElementsMounted
      , s = ae(()=>{
        var T;
        return (T = Ge(r.open)) != null ? T : !0
    }
    )
      , l = ae(()=>Ge(r.middleware))
      , c = ae(()=>{
        var T;
        return (T = Ge(r.placement)) != null ? T : "bottom"
    }
    )
      , f = ae(()=>{
        var T;
        return (T = Ge(r.strategy)) != null ? T : "absolute"
    }
    )
      , v = ae(()=>{
        var T;
        return (T = Ge(r.transform)) != null ? T : !0
    }
    )
      , g = ae(()=>Is(n.value))
      , y = ae(()=>Is(i.value))
      , O = Se(0)
      , N = Se(0)
      , k = Se(f.value)
      , w = Se(c.value)
      , P = Cb({})
      , S = Se(!1)
      , Z = ae(()=>{
        const T = {
            position: k.value,
            left: "0",
            top: "0"
        };
        if (!y.value)
            return T;
        const L = Rc(y.value, O.value)
          , Q = Rc(y.value, N.value);
        return v.value ? {
            ...T,
            transform: "translate(" + L + "px, " + Q + "px)",
            ...Ed(y.value) >= 1.5 && {
                willChange: "transform"
            }
        } : {
            position: k.value,
            left: L + "px",
            top: Q + "px"
        }
    }
    );
    let I;
    function j() {
        g.value == null || y.value == null || lx(g.value, y.value, {
            middleware: l.value,
            placement: c.value,
            strategy: f.value
        }).then(T=>{
            O.value = T.x,
            N.value = T.y,
            k.value = T.strategy,
            w.value = T.placement,
            P.value = T.middlewareData,
            S.value = !0
        }
        )
    }
    function H() {
        typeof I == "function" && (I(),
        I = void 0)
    }
    function W() {
        if (H(),
        o === void 0) {
            j();
            return
        }
        if (g.value != null && y.value != null) {
            I = o(g.value, y.value, j);
            return
        }
    }
    function V() {
        s.value || (S.value = !1)
    }
    return jr([l, c, f], j, {
        flush: "sync"
    }),
    jr([g, y], W, {
        flush: "sync"
    }),
    jr(s, V, {
        flush: "sync"
    }),
    Hc() && Pb(H),
    {
        x: Or(O),
        y: Or(N),
        strategy: Or(k),
        placement: Or(w),
        middlewareData: Or(P),
        isPositioned: Or(S),
        floatingStyles: Z,
        update: j
    }
}
let fx = 0;
function px() {
    return ++fx
}
function di() {
    return px()
}
function de(n) {
    var i;
    if (n == null || n.value == null)
        return null;
    let r = (i = n.value.$el) != null ? i : n.value;
    return r instanceof Node ? r : null
}
function bn(n, i, ...r) {
    if (n in i) {
        let s = i[n];
        return typeof s == "function" ? s(...r) : s
    }
    let o = new Error(`Tried to handle "${n}" but there is no handler defined. Only defined handlers are: ${Object.keys(i).map(s=>`"${s}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, bn),
    o
}
var hx = Object.defineProperty
  , vx = (n,i,r)=>i in n ? hx(n, i, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
}) : n[i] = r
  , Fc = (n,i,r)=>(vx(n, typeof i != "symbol" ? i + "" : i, r),
r);
let gx = class {
    constructor() {
        Fc(this, "current", this.detect()),
        Fc(this, "currentId", 0)
    }
    set(n) {
        this.current !== n && (this.currentId = 0,
        this.current = n)
    }
    reset() {
        this.set(this.detect())
    }
    nextId() {
        return ++this.currentId
    }
    get isServer() {
        return this.current === "server"
    }
    get isClient() {
        return this.current === "client"
    }
    detect() {
        return typeof window > "u" || typeof document > "u" ? "server" : "client"
    }
}
  , Xa = new gx;
function Mi(n) {
    if (Xa.isServer)
        return null;
    if (n instanceof Node)
        return n.ownerDocument;
    if (n != null && n.hasOwnProperty("value")) {
        let i = de(n);
        if (i)
            return i.ownerDocument
    }
    return document
}
let Ds = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(n=>`${n}:not([tabindex='-1'])`).join(",");
var pn = (n=>(n[n.First = 1] = "First",
n[n.Previous = 2] = "Previous",
n[n.Next = 4] = "Next",
n[n.Last = 8] = "Last",
n[n.WrapAround = 16] = "WrapAround",
n[n.NoScroll = 32] = "NoScroll",
n))(pn || {})
  , Wa = (n=>(n[n.Error = 0] = "Error",
n[n.Overflow = 1] = "Overflow",
n[n.Success = 2] = "Success",
n[n.Underflow = 3] = "Underflow",
n))(Wa || {})
  , mx = (n=>(n[n.Previous = -1] = "Previous",
n[n.Next = 1] = "Next",
n))(mx || {});
function Ja(n=document.body) {
    return n == null ? [] : Array.from(n.querySelectorAll(Ds)).sort((i,r)=>Math.sign((i.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)))
}
var Xs = (n=>(n[n.Strict = 0] = "Strict",
n[n.Loose = 1] = "Loose",
n))(Xs || {});
function Ad(n, i=0) {
    var r;
    return n === ((r = Mi(n)) == null ? void 0 : r.body) ? !1 : bn(i, {
        0() {
            return n.matches(Ds)
        },
        1() {
            let o = n;
            for (; o !== null; ) {
                if (o.matches(Ds))
                    return !0;
                o = o.parentElement
            }
            return !1
        }
    })
}
var yx = (n=>(n[n.Keyboard = 0] = "Keyboard",
n[n.Mouse = 1] = "Mouse",
n))(yx || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", n=>{
    n.metaKey || n.altKey || n.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "")
}
, !0),
document.addEventListener("click", n=>{
    n.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : n.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "")
}
, !0));
let bx = ["textarea", "input"].join(",");
function _x(n) {
    var i, r;
    return (r = (i = n == null ? void 0 : n.matches) == null ? void 0 : i.call(n, bx)) != null ? r : !1
}
function xx(n, i=r=>r) {
    return n.slice().sort((r,o)=>{
        let s = i(r)
          , l = i(o);
        if (s === null || l === null)
            return 0;
        let c = s.compareDocumentPosition(l);
        return c & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : c & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    }
    )
}
function er(n, i, {sorted: r=!0, relativeTo: o=null, skipElements: s=[]}={}) {
    var l;
    let c = (l = Array.isArray(n) ? n.length > 0 ? n[0].ownerDocument : document : n == null ? void 0 : n.ownerDocument) != null ? l : document
      , f = Array.isArray(n) ? r ? xx(n) : n : Ja(n);
    s.length > 0 && f.length > 1 && (f = f.filter(w=>!s.includes(w))),
    o = o ?? c.activeElement;
    let v = (()=>{
        if (i & 5)
            return 1;
        if (i & 10)
            return -1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), g = (()=>{
        if (i & 1)
            return 0;
        if (i & 2)
            return Math.max(0, f.indexOf(o)) - 1;
        if (i & 4)
            return Math.max(0, f.indexOf(o)) + 1;
        if (i & 8)
            return f.length - 1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), y = i & 32 ? {
        preventScroll: !0
    } : {}, O = 0, N = f.length, k;
    do {
        if (O >= N || O + N <= 0)
            return 0;
        let w = g + O;
        if (i & 16)
            w = (w + N) % N;
        else {
            if (w < 0)
                return 3;
            if (w >= N)
                return 1
        }
        k = f[w],
        k == null || k.focus(y),
        O += v
    } while (k !== c.activeElement);
    return i & 6 && _x(k) && k.select(),
    2
}
function wx() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
}
function kx() {
    return /Android/gi.test(window.navigator.userAgent)
}
function Sx() {
    return wx() || kx()
}
function Oa(n, i, r) {
    Xa.isServer || Fn(o=>{
        document.addEventListener(n, i, r),
        o(()=>document.removeEventListener(n, i, r))
    }
    )
}
function Cd(n, i, r) {
    Xa.isServer || Fn(o=>{
        window.addEventListener(n, i, r),
        o(()=>window.removeEventListener(n, i, r))
    }
    )
}
function Ox(n, i, r=ae(()=>!0)) {
    function o(l, c) {
        if (!r.value || l.defaultPrevented)
            return;
        let f = c(l);
        if (f === null || !f.getRootNode().contains(f))
            return;
        let v = function g(y) {
            return typeof y == "function" ? g(y()) : Array.isArray(y) || y instanceof Set ? y : [y]
        }(n);
        for (let g of v) {
            if (g === null)
                continue;
            let y = g instanceof HTMLElement ? g : de(g);
            if (y != null && y.contains(f) || l.composed && l.composedPath().includes(y))
                return
        }
        return !Ad(f, Xs.Loose) && f.tabIndex !== -1 && l.preventDefault(),
        i(l, f)
    }
    let s = Se(null);
    Oa("pointerdown", l=>{
        var c, f;
        r.value && (s.value = ((f = (c = l.composedPath) == null ? void 0 : c.call(l)) == null ? void 0 : f[0]) || l.target)
    }
    , !0),
    Oa("mousedown", l=>{
        var c, f;
        r.value && (s.value = ((f = (c = l.composedPath) == null ? void 0 : c.call(l)) == null ? void 0 : f[0]) || l.target)
    }
    , !0),
    Oa("click", l=>{
        Sx() || s.value && (o(l, ()=>s.value),
        s.value = null)
    }
    , !0),
    Oa("touchend", l=>o(l, ()=>l.target instanceof HTMLElement ? l.target : null), !0),
    Cd("blur", l=>o(l, ()=>window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0)
}
function Wc(n, i) {
    if (n)
        return n;
    let r = i ?? "button";
    if (typeof r == "string" && r.toLowerCase() === "button")
        return "button"
}
function $x(n, i) {
    let r = Se(Wc(n.value.type, n.value.as));
    return ur(()=>{
        r.value = Wc(n.value.type, n.value.as)
    }
    ),
    Fn(()=>{
        var o;
        r.value || de(i) && de(i)instanceof HTMLButtonElement && !((o = de(i)) != null && o.hasAttribute("type")) && (r.value = "button")
    }
    ),
    r
}
var Va = (n=>(n[n.None = 0] = "None",
n[n.RenderStrategy = 1] = "RenderStrategy",
n[n.Static = 2] = "Static",
n))(Va || {})
  , Tx = (n=>(n[n.Unmount = 0] = "Unmount",
n[n.Hidden = 1] = "Hidden",
n))(Tx || {});
function Qa({visible: n=!0, features: i=0, ourProps: r, theirProps: o, ...s}) {
    var l;
    let c = Md(o, r)
      , f = Object.assign(s, {
        props: c
    });
    if (n || i & 2 && c.static)
        return ks(f);
    if (i & 1) {
        let v = (l = c.unmount) == null || l ? 0 : 1;
        return bn(v, {
            0() {
                return null
            },
            1() {
                return ks({
                    ...s,
                    props: {
                        ...c,
                        hidden: !0,
                        style: {
                            display: "none"
                        }
                    }
                })
            }
        })
    }
    return ks(f)
}
function ks({props: n, attrs: i, slots: r, slot: o, name: s}) {
    var l, c;
    let {as: f, ...v} = jx(n, ["unmount", "static"])
      , g = (l = r.default) == null ? void 0 : l.call(r, o)
      , y = {};
    if (o) {
        let O = !1
          , N = [];
        for (let[k,w] of Object.entries(o))
            typeof w == "boolean" && (O = !0),
            w === !0 && N.push(k);
        O && (y["data-headlessui-state"] = N.join(" "))
    }
    if (f === "template") {
        if (g = Pd(g ?? []),
        Object.keys(v).length > 0 || Object.keys(i).length > 0) {
            let[O,...N] = g ?? [];
            if (!Ex(O) || N.length > 0)
                throw new Error(['Passing props on "template"!', "", `The current component <${s} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(v).concat(Object.keys(i)).map(P=>P.trim()).filter((P,S,Z)=>Z.indexOf(P) === S).sort((P,S)=>P.localeCompare(S)).map(P=>`  - ${P}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map(P=>`  - ${P}`).join(`
`)].join(`
`));
            let k = Md((c = O.props) != null ? c : {}, v, y)
              , w = Mb(O, k, !0);
            for (let P in k)
                P.startsWith("on") && (w.props || (w.props = {}),
                w.props[P] = k[P]);
            return w
        }
        return Array.isArray(g) && g.length === 1 ? g[0] : g
    }
    return Xt(f, Object.assign({}, v, y), {
        default: ()=>g
    })
}
function Pd(n) {
    return n.flatMap(i=>i.type === Ti ? Pd(i.children) : [i])
}
function Md(...n) {
    if (n.length === 0)
        return {};
    if (n.length === 1)
        return n[0];
    let i = {}
      , r = {};
    for (let o of n)
        for (let s in o)
            s.startsWith("on") && typeof o[s] == "function" ? (r[s] != null || (r[s] = []),
            r[s].push(o[s])) : i[s] = o[s];
    if (i.disabled || i["aria-disabled"])
        return Object.assign(i, Object.fromEntries(Object.keys(r).map(o=>[o, void 0])));
    for (let o in r)
        Object.assign(i, {
            [o](s, ...l) {
                let c = r[o];
                for (let f of c) {
                    if (s instanceof Event && s.defaultPrevented)
                        return;
                    f(s, ...l)
                }
            }
        });
    return i
}
function jx(n, i=[]) {
    let r = Object.assign({}, n);
    for (let o of i)
        o in r && delete r[o];
    return r
}
function Ex(n) {
    return n == null ? !1 : typeof n.type == "string" || typeof n.type == "object" || typeof n.type == "function"
}
var Oi = (n=>(n[n.None = 1] = "None",
n[n.Focusable = 2] = "Focusable",
n[n.Hidden = 4] = "Hidden",
n))(Oi || {});
let Ua = ji({
    name: "Hidden",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        features: {
            type: Number,
            default: 1
        }
    },
    setup(n, {slots: i, attrs: r}) {
        return ()=>{
            var o;
            let {features: s, ...l} = n
              , c = {
                "aria-hidden": (s & 2) === 2 ? !0 : (o = l["aria-hidden"]) != null ? o : void 0,
                style: {
                    position: "fixed",
                    top: 1,
                    left: 1,
                    width: 1,
                    height: 0,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: "0",
                    ...(s & 4) === 4 && (s & 2) !== 2 && {
                        display: "none"
                    }
                }
            };
            return Qa({
                ourProps: c,
                theirProps: l,
                slot: {},
                attrs: r,
                slots: i,
                name: "Hidden"
            })
        }
    }
})
  , Nd = Symbol("Context");
var $i = (n=>(n[n.Open = 1] = "Open",
n[n.Closed = 2] = "Closed",
n[n.Closing = 4] = "Closing",
n[n.Opening = 8] = "Opening",
n))($i || {});
function Ax() {
    return Bn(Nd, null)
}
function Cx(n) {
    Lr(Nd, n)
}
var Cn = (n=>(n.Space = " ",
n.Enter = "Enter",
n.Escape = "Escape",
n.Backspace = "Backspace",
n.Delete = "Delete",
n.ArrowLeft = "ArrowLeft",
n.ArrowUp = "ArrowUp",
n.ArrowRight = "ArrowRight",
n.ArrowDown = "ArrowDown",
n.Home = "Home",
n.End = "End",
n.PageUp = "PageUp",
n.PageDown = "PageDown",
n.Tab = "Tab",
n))(Cn || {});
function Px(n) {
    function i() {
        document.readyState !== "loading" && (n(),
        document.removeEventListener("DOMContentLoaded", i))
    }
    typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", i),
    i())
}
let ui = [];
Px(()=>{
    function n(i) {
        i.target instanceof HTMLElement && i.target !== document.body && ui[0] !== i.target && (ui.unshift(i.target),
        ui = ui.filter(r=>r != null && r.isConnected),
        ui.splice(10))
    }
    window.addEventListener("click", n, {
        capture: !0
    }),
    window.addEventListener("mousedown", n, {
        capture: !0
    }),
    window.addEventListener("focus", n, {
        capture: !0
    }),
    document.body.addEventListener("click", n, {
        capture: !0
    }),
    document.body.addEventListener("mousedown", n, {
        capture: !0
    }),
    document.body.addEventListener("focus", n, {
        capture: !0
    })
}
);
var Mx = (n=>(n[n.First = 0] = "First",
n[n.Previous = 1] = "Previous",
n[n.Next = 2] = "Next",
n[n.Last = 3] = "Last",
n[n.Specific = 4] = "Specific",
n[n.Nothing = 5] = "Nothing",
n))(Mx || {})
  , Nx = (n=>(n[n.Open = 0] = "Open",
n[n.Closed = 1] = "Closed",
n))(Nx || {})
  , zx = (n=>(n[n.Single = 0] = "Single",
n[n.Multi = 1] = "Multi",
n))(zx || {})
  , Bx = (n=>(n[n.Pointer = 0] = "Pointer",
n[n.Focus = 1] = "Focus",
n[n.Other = 2] = "Other",
n))(Bx || {});
function Lx(n, i, r, o) {
    Xa.isServer || Fn(s=>{
        n = n ?? window,
        n.addEventListener(i, r, o),
        s(()=>n.removeEventListener(i, r, o))
    }
    )
}
var hn = (n=>(n[n.Forwards = 0] = "Forwards",
n[n.Backwards = 1] = "Backwards",
n))(hn || {});
function zd() {
    let n = Se(0);
    return Cd("keydown", i=>{
        i.key === "Tab" && (n.value = i.shiftKey ? 1 : 0)
    }
    ),
    n
}
function Ix({defaultContainers: n=[], portals: i, mainTreeNodeRef: r}={}) {
    let o = Se(null)
      , s = Mi(o);
    function l() {
        var c;
        let f = [];
        for (let v of n)
            v !== null && (v instanceof HTMLElement ? f.push(v) : "value"in v && v.value instanceof HTMLElement && f.push(v.value));
        if (i != null && i.value)
            for (let v of i.value)
                f.push(v);
        for (let v of (c = s == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? c : [])
            v !== document.body && v !== document.head && v instanceof HTMLElement && v.id !== "headlessui-portal-root" && (v.contains(de(o)) || f.some(g=>v.contains(g)) || f.push(v));
        return f
    }
    return {
        resolveContainers: l,
        contains(c) {
            return l().some(f=>f.contains(c))
        },
        mainTreeNodeRef: o,
        MainTreeNode() {
            return r != null ? null : Xt(Ua, {
                features: Oi.Hidden,
                ref: o
            })
        }
    }
}
let Vc = Symbol("PortalParentContext");
function Dx() {
    let n = Bn(Vc, null)
      , i = Se([]);
    function r(l) {
        return i.value.push(l),
        n && n.register(l),
        ()=>o(l)
    }
    function o(l) {
        let c = i.value.indexOf(l);
        c !== -1 && i.value.splice(c, 1),
        n && n.unregister(l)
    }
    let s = {
        register: r,
        unregister: o,
        portals: i
    };
    return [i, ji({
        name: "PortalWrapper",
        setup(l, {slots: c}) {
            return Lr(Vc, s),
            ()=>{
                var f;
                return (f = c.default) == null ? void 0 : f.call(c)
            }
        }
    })]
}
var Zx = (n=>(n[n.Open = 0] = "Open",
n[n.Closed = 1] = "Closed",
n))(Zx || {})
  , Rx = (n=>(n[n.Single = 0] = "Single",
n[n.Multi = 1] = "Multi",
n))(Rx || {})
  , Fx = (n=>(n[n.Pointer = 0] = "Pointer",
n[n.Other = 1] = "Other",
n))(Fx || {})
  , Wx = (n=>(n[n.Open = 0] = "Open",
n[n.Closed = 1] = "Closed",
n))(Wx || {});
let Bd = Symbol("PopoverContext");
function Js(n) {
    let i = Bn(Bd, null);
    if (i === null) {
        let r = new Error(`<${n} /> is missing a parent <${Dd.name} /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(r, Js),
        r
    }
    return i
}
let Vx = Symbol("PopoverGroupContext");
function Ld() {
    return Bn(Vx, null)
}
let Id = Symbol("PopoverPanelContext");
function Ux() {
    return Bn(Id, null)
}
let Dd = ji({
    name: "Popover",
    inheritAttrs: !1,
    props: {
        as: {
            type: [Object, String],
            default: "div"
        }
    },
    setup(n, {slots: i, attrs: r, expose: o}) {
        var s;
        let l = Se(null);
        o({
            el: l,
            $el: l
        });
        let c = Se(1)
          , f = Se(null)
          , v = Se(null)
          , g = Se(null)
          , y = Se(null)
          , O = ae(()=>Mi(l))
          , N = ae(()=>{
            var W, V;
            if (!de(f) || !de(y))
                return !1;
            for (let D of document.querySelectorAll("body > *"))
                if (Number(D == null ? void 0 : D.contains(de(f))) ^ Number(D == null ? void 0 : D.contains(de(y))))
                    return !0;
            let T = Ja()
              , L = T.indexOf(de(f))
              , Q = (L + T.length - 1) % T.length
              , ne = (L + 1) % T.length
              , Y = T[Q]
              , U = T[ne];
            return !((W = de(y)) != null && W.contains(Y)) && !((V = de(y)) != null && V.contains(U))
        }
        )
          , k = {
            popoverState: c,
            buttonId: Se(null),
            panelId: Se(null),
            panel: y,
            button: f,
            isPortalled: N,
            beforePanelSentinel: v,
            afterPanelSentinel: g,
            togglePopover() {
                c.value = bn(c.value, {
                    0: 1,
                    1: 0
                })
            },
            closePopover() {
                c.value !== 1 && (c.value = 1)
            },
            close(W) {
                k.closePopover();
                let V = (()=>W ? W instanceof HTMLElement ? W : W.value instanceof HTMLElement ? de(W) : de(k.button) : de(k.button))();
                V == null || V.focus()
            }
        };
        Lr(Bd, k),
        Cx(ae(()=>bn(c.value, {
            0: $i.Open,
            1: $i.Closed
        })));
        let w = {
            buttonId: k.buttonId,
            panelId: k.panelId,
            close() {
                k.closePopover()
            }
        }
          , P = Ld()
          , S = P == null ? void 0 : P.registerPopover
          , [Z,I] = Dx()
          , j = Ix({
            mainTreeNodeRef: P == null ? void 0 : P.mainTreeNodeRef,
            portals: Z,
            defaultContainers: [f, y]
        });
        function H() {
            var W, V, T, L;
            return (L = P == null ? void 0 : P.isFocusWithinPopoverGroup()) != null ? L : ((W = O.value) == null ? void 0 : W.activeElement) && (((V = de(f)) == null ? void 0 : V.contains(O.value.activeElement)) || ((T = de(y)) == null ? void 0 : T.contains(O.value.activeElement)))
        }
        return Fn(()=>S == null ? void 0 : S(w)),
        Lx((s = O.value) == null ? void 0 : s.defaultView, "focus", W=>{
            var V, T;
            W.target !== window && W.target instanceof HTMLElement && c.value === 0 && (H() || f && y && (j.contains(W.target) || (V = de(k.beforePanelSentinel)) != null && V.contains(W.target) || (T = de(k.afterPanelSentinel)) != null && T.contains(W.target) || k.closePopover()))
        }
        , !0),
        Ox(j.resolveContainers, (W,V)=>{
            var T;
            k.closePopover(),
            Ad(V, Xs.Loose) || (W.preventDefault(),
            (T = de(f)) == null || T.focus())
        }
        , ae(()=>c.value === 0)),
        ()=>{
            let W = {
                open: c.value === 0,
                close: k.close
            };
            return Xt(Ti, [Xt(I, {}, ()=>Qa({
                theirProps: {
                    ...n,
                    ...r
                },
                ourProps: {
                    ref: l
                },
                slot: W,
                slots: i,
                attrs: r,
                name: "Popover"
            })), Xt(j.MainTreeNode)])
        }
    }
})
  , qx = ji({
    name: "PopoverButton",
    props: {
        as: {
            type: [Object, String],
            default: "button"
        },
        disabled: {
            type: [Boolean],
            default: !1
        },
        id: {
            type: String,
            default: ()=>`headlessui-popover-button-${di()}`
        }
    },
    inheritAttrs: !1,
    setup(n, {attrs: i, slots: r, expose: o}) {
        let s = Js("PopoverButton")
          , l = ae(()=>Mi(s.button));
        o({
            el: s.button,
            $el: s.button
        }),
        ur(()=>{
            s.buttonId.value = n.id
        }
        ),
        Zs(()=>{
            s.buttonId.value = null
        }
        );
        let c = Ld()
          , f = c == null ? void 0 : c.closeOthers
          , v = Ux()
          , g = ae(()=>v === null ? !1 : v.value === s.panelId.value)
          , y = Se(null)
          , O = `headlessui-focus-sentinel-${di()}`;
        g.value || Fn(()=>{
            s.button.value = de(y)
        }
        );
        let N = $x(ae(()=>({
            as: n.as,
            type: i.type
        })), y);
        function k(j) {
            var H, W, V, T, L;
            if (g.value) {
                if (s.popoverState.value === 1)
                    return;
                switch (j.key) {
                case Cn.Space:
                case Cn.Enter:
                    j.preventDefault(),
                    (W = (H = j.target).click) == null || W.call(H),
                    s.closePopover(),
                    (V = de(s.button)) == null || V.focus();
                    break
                }
            } else
                switch (j.key) {
                case Cn.Space:
                case Cn.Enter:
                    j.preventDefault(),
                    j.stopPropagation(),
                    s.popoverState.value === 1 && (f == null || f(s.buttonId.value)),
                    s.togglePopover();
                    break;
                case Cn.Escape:
                    if (s.popoverState.value !== 0)
                        return f == null ? void 0 : f(s.buttonId.value);
                    if (!de(s.button) || (T = l.value) != null && T.activeElement && !((L = de(s.button)) != null && L.contains(l.value.activeElement)))
                        return;
                    j.preventDefault(),
                    j.stopPropagation(),
                    s.closePopover();
                    break
                }
        }
        function w(j) {
            g.value || j.key === Cn.Space && j.preventDefault()
        }
        function P(j) {
            var H, W;
            n.disabled || (g.value ? (s.closePopover(),
            (H = de(s.button)) == null || H.focus()) : (j.preventDefault(),
            j.stopPropagation(),
            s.popoverState.value === 1 && (f == null || f(s.buttonId.value)),
            s.togglePopover(),
            (W = de(s.button)) == null || W.focus()))
        }
        function S(j) {
            j.preventDefault(),
            j.stopPropagation()
        }
        let Z = zd();
        function I() {
            let j = de(s.panel);
            if (!j)
                return;
            function H() {
                bn(Z.value, {
                    [hn.Forwards]: ()=>er(j, pn.First),
                    [hn.Backwards]: ()=>er(j, pn.Last)
                }) === Wa.Error && er(Ja().filter(W=>W.dataset.headlessuiFocusGuard !== "true"), bn(Z.value, {
                    [hn.Forwards]: pn.Next,
                    [hn.Backwards]: pn.Previous
                }), {
                    relativeTo: de(s.button)
                })
            }
            H()
        }
        return ()=>{
            let j = s.popoverState.value === 0
              , H = {
                open: j
            }
              , {id: W, ...V} = n
              , T = g.value ? {
                ref: y,
                type: N.value,
                onKeydown: k,
                onClick: P
            } : {
                ref: y,
                id: W,
                type: N.value,
                "aria-expanded": s.popoverState.value === 0,
                "aria-controls": de(s.panel) ? s.panelId.value : void 0,
                disabled: n.disabled ? !0 : void 0,
                onKeydown: k,
                onKeyup: w,
                onClick: P,
                onMousedown: S
            };
            return Xt(Ti, [Qa({
                ourProps: T,
                theirProps: {
                    ...i,
                    ...V
                },
                slot: H,
                attrs: i,
                slots: r,
                name: "PopoverButton"
            }), j && !g.value && s.isPortalled.value && Xt(Ua, {
                id: O,
                features: Oi.Focusable,
                "data-headlessui-focus-guard": !0,
                as: "button",
                type: "button",
                onFocus: I
            })])
        }
    }
})
  , Hx = ji({
    name: "PopoverPanel",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        static: {
            type: Boolean,
            default: !1
        },
        unmount: {
            type: Boolean,
            default: !0
        },
        focus: {
            type: Boolean,
            default: !1
        },
        id: {
            type: String,
            default: ()=>`headlessui-popover-panel-${di()}`
        }
    },
    inheritAttrs: !1,
    setup(n, {attrs: i, slots: r, expose: o}) {
        let {focus: s} = n
          , l = Js("PopoverPanel")
          , c = ae(()=>Mi(l.panel))
          , f = `headlessui-focus-sentinel-before-${di()}`
          , v = `headlessui-focus-sentinel-after-${di()}`;
        o({
            el: l.panel,
            $el: l.panel
        }),
        ur(()=>{
            l.panelId.value = n.id
        }
        ),
        Zs(()=>{
            l.panelId.value = null
        }
        ),
        Lr(Id, l.panelId),
        Fn(()=>{
            var S, Z;
            if (!s || l.popoverState.value !== 0 || !l.panel)
                return;
            let I = (S = c.value) == null ? void 0 : S.activeElement;
            (Z = de(l.panel)) != null && Z.contains(I) || er(de(l.panel), pn.First)
        }
        );
        let g = Ax()
          , y = ae(()=>g !== null ? (g.value & $i.Open) === $i.Open : l.popoverState.value === 0);
        function O(S) {
            var Z, I;
            switch (S.key) {
            case Cn.Escape:
                if (l.popoverState.value !== 0 || !de(l.panel) || c.value && !((Z = de(l.panel)) != null && Z.contains(c.value.activeElement)))
                    return;
                S.preventDefault(),
                S.stopPropagation(),
                l.closePopover(),
                (I = de(l.button)) == null || I.focus();
                break
            }
        }
        function N(S) {
            var Z, I, j, H, W;
            let V = S.relatedTarget;
            V && de(l.panel) && ((Z = de(l.panel)) != null && Z.contains(V) || (l.closePopover(),
            ((j = (I = de(l.beforePanelSentinel)) == null ? void 0 : I.contains) != null && j.call(I, V) || (W = (H = de(l.afterPanelSentinel)) == null ? void 0 : H.contains) != null && W.call(H, V)) && V.focus({
                preventScroll: !0
            })))
        }
        let k = zd();
        function w() {
            let S = de(l.panel);
            if (!S)
                return;
            function Z() {
                bn(k.value, {
                    [hn.Forwards]: ()=>{
                        var I;
                        er(S, pn.First) === Wa.Error && ((I = de(l.afterPanelSentinel)) == null || I.focus())
                    }
                    ,
                    [hn.Backwards]: ()=>{
                        var I;
                        (I = de(l.button)) == null || I.focus({
                            preventScroll: !0
                        })
                    }
                })
            }
            Z()
        }
        function P() {
            let S = de(l.panel);
            if (!S)
                return;
            function Z() {
                bn(k.value, {
                    [hn.Forwards]: ()=>{
                        let I = de(l.button)
                          , j = de(l.panel);
                        if (!I)
                            return;
                        let H = Ja()
                          , W = H.indexOf(I)
                          , V = H.slice(0, W + 1)
                          , T = [...H.slice(W + 1), ...V];
                        for (let L of T.slice())
                            if (L.dataset.headlessuiFocusGuard === "true" || j != null && j.contains(L)) {
                                let Q = T.indexOf(L);
                                Q !== -1 && T.splice(Q, 1)
                            }
                        er(T, pn.First, {
                            sorted: !1
                        })
                    }
                    ,
                    [hn.Backwards]: ()=>{
                        var I;
                        er(S, pn.Previous) === Wa.Error && ((I = de(l.button)) == null || I.focus())
                    }
                })
            }
            Z()
        }
        return ()=>{
            let S = {
                open: l.popoverState.value === 0,
                close: l.close
            }
              , {id: Z, focus: I, ...j} = n
              , H = {
                ref: l.panel,
                id: Z,
                onKeydown: O,
                onFocusout: s && l.popoverState.value === 0 ? N : void 0,
                tabIndex: -1
            };
            return Qa({
                ourProps: H,
                theirProps: {
                    ...i,
                    ...j
                },
                attrs: i,
                slot: S,
                slots: {
                    ...r,
                    default: (...W)=>{
                        var V;
                        return [Xt(Ti, [y.value && l.isPortalled.value && Xt(Ua, {
                            id: f,
                            ref: l.beforePanelSentinel,
                            features: Oi.Focusable,
                            "data-headlessui-focus-guard": !0,
                            as: "button",
                            type: "button",
                            onFocus: w
                        }), (V = r.default) == null ? void 0 : V.call(r, ...W), y.value && l.isPortalled.value && Xt(Ua, {
                            id: v,
                            ref: l.afterPanelSentinel,
                            features: Oi.Focusable,
                            "data-headlessui-focus-guard": !0,
                            as: "button",
                            type: "button",
                            onFocus: P
                        })])]
                    }
                },
                features: Va.RenderStrategy | Va.Static,
                visible: y.value,
                name: "PopoverPanel"
            })
        }
    }
});
var Kx = (n=>(n.Finished = "finished",
n.Cancelled = "cancelled",
n))(Kx || {})
  , Yx = (n=>(n.Visible = "visible",
n.Hidden = "hidden",
n))(Yx || {});
Va.RenderStrategy;
const dw = Object.assign({
    name: "BcPopover"
}, {
    __name: "index",
    props: {
        adaptiveWidth: {
            type: Boolean,
            default: !1
        },
        appendToBody: {
            type: Boolean,
            default: !1
        },
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                reference: "",
                panel: "",
                arrow: "",
                content: ""
            })
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        hasArrow: {
            type: Boolean,
            default: !1
        },
        modelValue: {
            type: Boolean,
            default: !1
        },
        offset: {
            type: Number,
            default: 8
        },
        overlay: {
            type: Boolean,
            default: !0
        },
        placement: {
            type: String,
            values: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"],
            default: "bottom"
        },
        trigger: {
            type: String,
            values: ["click", "hover", "manual"],
            default: "click"
        },
        width: {
            type: [String, Number]
        },
        zIndex: {
            type: [Number, String],
            default: 100
        }
    },
    emits: ["update:modelValue"],
    setup(n, {emit: i}) {
        const r = n
          , o = Se(null)
          , s = Se(null)
          , l = Se(null)
          , {floatingStyles: c, middlewareData: f, placement: v} = dx(ae(()=>{
            var I;
            return (I = o.value) == null ? void 0 : I.el
        }
        ), ae(()=>{
            var I;
            return (I = s.value) == null ? void 0 : I.el
        }
        ), {
            placement: r.placement,
            middleware: [W0(r.offset), R0(), V0(), cx({
                element: l,
                padding: 8
            })],
            whileElementsMounted: ux
        })
          , g = Se(null);
        Fn(()=>{
            r.trigger === "click" ? g.value = null : r.trigger === "hover" ? g.value = !1 : r.trigger === "manual" && (g.value = r.modelValue)
        }
        ),
        jr(()=>r.modelValue, I=>{
            r.trigger === "manual" && (g.value = I)
        }
        );
        const y = ae(()=>{
            const I = v.value.split("-")[0];
            return {
                top: "bottom",
                right: "left",
                bottom: "top",
                left: "right"
            }[I]
        }
        )
          , O = ae(()=>{
            var I;
            const j = f.value.arrow
              , H = (I = l.value) == null ? void 0 : I.offsetWidth;
            return {
                left: (j == null ? void 0 : j.x) != null ? `${j.x}px` : "",
                top: (j == null ? void 0 : j.y) != null ? `${j.y}px` : "",
                right: "",
                bottom: "",
                [y.value]: H ? `${-H / 2}px` : ""
            }
        }
        );
        ae(()=>({
            zIndex: r.zIndex - 1
        }));
        const N = ae(()=>{
            var I;
            let j = "";
            const H = (I = o.value) == null ? void 0 : I.el.offsetWidth;
            return r.adaptiveWidth && typeof H == "number" ? j = `${H}px` : j = r.width ? As(r.width) : "var(--bc-popover-width)",
            {
                ...c.value,
                zIndex: r.zIndex,
                width: j
            }
        }
        )
          , k = ae(()=>Mt({
            slots: {
                base: "relative flex",
                reference: "",
                overlay: "fixed inset-0 bg-black/30 transition-opacity",
                panel: "rounded-popover min-w-popover shadow-lg ring-1 ring-gray-200",
                arrow: "absolute z-[-1] h-2.5 w-2.5 rotate-45 rounded-sm border border-gray-200 bg-white",
                content: "rounded-popover w-full bg-white p-3"
            },
            variants: {
                disabled: {
                    true: {
                        reference: "cursor-not-allowed opacity-60"
                    }
                }
            }
        })({
            adaptiveWidth: r.adaptiveWidth,
            appendToBody: r.appendToBody,
            disabled: r.disabled
        }))
          , w = (I=150)=>{
            const j = Se(null)
              , H = ()=>{
                j.value !== null && (clearTimeout(j.value),
                j.value = null)
            }
            ;
            return {
                show: ()=>{
                    r.trigger === "hover" && (H(),
                    g.value = !0)
                }
                ,
                delayClose: ()=>{
                    r.trigger === "hover" && (j.value = setTimeout(()=>{
                        g.value = !1
                    }
                    , I))
                }
                ,
                toggle: ()=>{
                    r.trigger === "manual" && (g.value = !g.value,
                    i("update:modelValue", g.value))
                }
            }
        }
          , {show: P, delayClose: S, toggle: Z} = w();
        return (I,j)=>(Ee(),
        zn(Ge(Dd), {
            class: $e([k.value.base({
                class: n.classes.base
            }), "bc-popover"])
        }, {
            default: fn(({open: H})=>[Tr(Ge(qx), {
                as: "div",
                ref_key: "referenceRef",
                ref: o,
                class: $e([k.value.reference({
                    class: n.classes.reference
                }), "bc-popover__reference"]),
                disabled: n.disabled,
                onClick: Ge(Z),
                onMouseenter: Ge(P),
                onMouseleave: Ge(S)
            }, {
                default: fn(()=>[qe(I.$slots, "reference", {
                    visible: g.value !== null ? g.value : H
                })]),
                _: 2
            }, 1032, ["class", "disabled", "onClick", "onMouseenter", "onMouseleave"]), (g.value !== null ? g.value : H) ? (Ee(),
            zn(Eb, {
                key: 0,
                to: "body",
                disabled: !n.appendToBody
            }, [Tr(Ab, {
                "enter-active-class": "transition duration-200 ease-out",
                "enter-from-class": "translate-y-1 opacity-0",
                "enter-to-class": "translate-y-0 opacity-100",
                "leave-active-class": "transition duration-150 ease-in",
                "leave-from-class": "translate-y-0 opacity-100",
                "leave-to-class": "translate-y-1 opacity-0"
            }, {
                default: fn(()=>[Tr(Ge(Hx), {
                    ref_key: "floatingRef",
                    ref: s,
                    class: $e([k.value.panel({
                        class: n.classes.panel
                    }), "bc-popover__panel"]),
                    static: "",
                    style: Cr(N.value),
                    onMouseenter: Ge(P),
                    onMouseleave: Ge(S)
                }, {
                    default: fn(({close: W})=>[n.hasArrow ? (Ee(),
                    Ze("div", {
                        key: 0,
                        ref_key: "arrowRef",
                        ref: l,
                        class: $e([k.value.arrow({
                            class: n.classes.arrow
                        }), "bc-popover__arrow"]),
                        style: Cr(O.value)
                    }, null, 6)) : ut("", !0), Ct("div", {
                        class: $e([k.value.content({
                            class: n.classes.content
                        }), "bc-popover__content"])
                    }, [qe(I.$slots, "default", {
                        close: W
                    })], 2)]),
                    _: 3
                }, 8, ["class", "style", "onMouseenter", "onMouseleave"])]),
                _: 3
            })], 8, ["disabled"])) : ut("", !0)]),
            _: 3
        }, 8, ["class"]))
    }
});
var Xx = Object.defineProperty
  , Jx = (n,i,r)=>i in n ? Xx(n, i, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
}) : n[i] = r
  , Qx = (n,i,r)=>(Jx(n, typeof i != "symbol" ? i + "" : i, r),
r);
class Gx {
    constructor() {
        Qx(this, "current", this.detect())
    }
    set(i) {
        this.current !== i && (this.current = i)
    }
    reset() {
        this.set(this.detect())
    }
    get isServer() {
        return this.current === "server"
    }
    get isClient() {
        return this.current === "client"
    }
    detect() {
        return typeof window > "u" || typeof document > "u" ? "server" : "client"
    }
}
new Gx;
Se("");
const ew = Object.assign({
    name: "BcTag"
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: ""
            })
        },
        color: {
            type: String,
            values: ["default", "neutral", "primary", "success", "warning", "danger"],
            default: "default"
        },
        icon: {
            type: String
        },
        round: {
            type: Boolean,
            default: !1
        },
        size: {
            type: String,
            values: ["default", "xlarge", "large", "small"],
            default: "default"
        },
        variant: {
            type: String,
            values: ["default", "outline", "solid", "plain"],
            default: "default"
        }
    },
    setup(n) {
        const i = n
          , r = ae(()=>Vs({
            slots: {
                base: "inline-flex shrink-0 items-center justify-center gap-1 border text-center font-bc-medium transition",
                icon: ""
            },
            variants: {
                round: {
                    true: "rounded-full",
                    false: "rounded-tag"
                },
                size: {
                    default: {
                        base: "px-2 py-[3px] text-xs",
                        icon: "text-[16px] leading-none"
                    },
                    xlarge: {
                        base: "px-4 py-[7px] text-sm",
                        icon: "text-[18px] leading-none"
                    },
                    large: {
                        base: "px-2.5 py-[3px] text-sm",
                        icon: "text-[18px] leading-none"
                    },
                    small: {
                        base: "px-2 py-px text-xs",
                        icon: "text-[14px] leading-none"
                    }
                },
                variant: {
                    outline: "border-current",
                    solid: "text-white",
                    plain: "border-0 bg-white"
                }
            },
            compoundVariants: [{
                color: "default",
                variant: "default",
                class: "border-gray-50 bg-base text-moderate"
            }, {
                color: "default",
                variant: "outline",
                class: "border-base text-moderate"
            }, {
                color: "default",
                variant: "plain",
                class: "text-moderate"
            }, {
                color: "default",
                variant: "solid",
                class: "border-subtle bg-moderate text-moderate"
            }, {
                color: "neutral",
                variant: "default",
                class: "border-neutral-light bg-neutral-light text-neutral"
            }, {
                color: "neutral",
                variant: "outline",
                class: "border-neutral text-neutral"
            }, {
                color: "neutral",
                variant: "solid",
                class: "border-neutral bg-neutral"
            }, {
                color: "primary",
                variant: "default",
                class: "border-primary-light bg-primary-light text-primary"
            }, {
                color: "primary",
                variant: "outline",
                class: "text-primary"
            }, {
                color: "primary",
                variant: "solid",
                class: "border-primary bg-primary"
            }, {
                color: "success",
                variant: "default",
                class: "border-success-light bg-success-light text-success"
            }, {
                color: "success",
                variant: "outline",
                class: "text-success"
            }, {
                color: "success",
                variant: "solid",
                class: "border-success bg-success"
            }, {
                color: "warning",
                variant: "default",
                class: "border-warning-light bg-warning-light text-warning"
            }, {
                color: "warning",
                variant: "outline",
                class: "text-warning"
            }, {
                color: "warning",
                variant: "solid",
                class: "border-warning bg-warning"
            }, {
                color: "danger",
                variant: "default",
                class: "border-danger-light bg-danger-light text-danger"
            }, {
                color: "danger",
                variant: "outline",
                class: "text-danger"
            }, {
                color: "danger",
                variant: "solid",
                class: "border-danger bg-danger"
            }]
        })({
            color: i.color,
            round: i.round,
            size: i.size,
            variant: i.variant
        }));
        return (o,s)=>(Ee(),
        Ze("span", {
            class: $e([r.value.base({
                class: n.classes.base
            }), "bc-tag"])
        }, [qe(o.$slots, "prefix", {}, ()=>[n.icon ? (Ee(),
        Ze("i", {
            key: 0,
            class: $e([r.value.icon(), n.icon, "bc-tag__icon"])
        }, null, 2)) : ut("", !0)]), qe(o.$slots, "default"), qe(o.$slots, "suffix")], 2))
    }
});
function tw(n, i) {
    return {
        mergedClasses: ae(()=>vn.merge({}, n, i.classes))
    }
}
const fw = Object.assign({
    name: "BcTagSelect"
}, {
    __name: "index",
    props: {
        classes: {
            type: Object,
            default: ()=>({
                base: "",
                item: {
                    base: "",
                    active: ""
                }
            })
        },
        clearButtonProps: {
            type: Object
        },
        hasClear: {
            type: Boolean,
            default: !1
        },
        hasMore: {
            type: Boolean,
            default: !1
        },
        modelValue: {
            type: [Array, String, Number, null],
            required: !0
        },
        multiple: {
            type: Boolean,
            default: !1
        },
        options: {
            type: Array,
            required: !0
        },
        tagProps: {
            type: Object
        },
        toggleable: {
            type: Boolean,
            default: !1
        }
    },
    emits: ["change", "update:modelValue"],
    setup(n, {emit: i}) {
        const r = n
          , o = Se(r.modelValue)
          , {mergedClasses: s} = tw({
            base: "",
            item: {
                base: "",
                active: ""
            }
        }, r)
          , l = ae(()=>{
            const y = s.value;
            return Mt({
                slots: {
                    base: `flex flex-wrap items-center gap-2 ${y.base}`,
                    item: `cursor-pointer hover:text-primary ${y.item.base}`
                },
                variants: {
                    active: {
                        true: {
                            item: `border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover hover:text-white ${y.item.active}`
                        }
                    }
                }
            })()
        }
        )
          , c = ae(()=>{
            const {multiple: y} = r;
            return y ? o.value.length : o.value !== null
        }
        );
        jr(()=>r.modelValue, y=>{
            o.value = y
        }
        );
        const f = y=>r.multiple ? o.value.includes(y.value) : o.value === y.value
          , v = y=>{
            r.multiple ? f(y) ? r.toggleable && (o.value = o.value.filter(O=>O !== y.value)) : o.value.push(y.value) : o.value = f(y) && r.toggleable ? null : y.value,
            i("update:modelValue", o.value),
            i("change", o.value)
        }
          , g = ()=>{
            r.multiple ? o.value = [] : o.value = null,
            i("update:modelValue", o.value),
            i("change", o.value)
        }
        ;
        return (y,O)=>(Ee(),
        Ze("div", {
            class: $e([l.value.base(), "bc-tag-select"])
        }, [(Ee(!0),
        Ze(Ti, null, jb(n.options, N=>(Ee(),
        zn(ew, Nn(n.tagProps, {
            key: N.value,
            classes: {
                base: [l.value.item({
                    active: f(N)
                }), "bc-tag-select__item"]
            },
            onClick: k=>v(N)
        }), {
            default: fn(()=>[Ta(Pr(N.label), 1)]),
            _: 2
        }, 1040, ["classes", "onClick"]))), 128)), qe(y.$slots, "append"), n.hasClear && c.value ? qe(y.$slots, "clear", {
            key: 0,
            clear: g
        }, ()=>[Tr(Es, Nn(n.clearButtonProps, {
            onClick: g
        }), {
            default: fn(()=>[Ta(" Clear ")]),
            _: 1
        }, 16)]) : ut("", !0)], 2))
    }
});
export {ew as C, iw as P, ow as W, sw as Z, aw as a, cw as c, lw as e, Es as k, uw as q, dw as s, rw as u, fw as x};
