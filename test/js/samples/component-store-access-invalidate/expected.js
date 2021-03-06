import {
	SvelteComponent,
	append,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	text
} from "svelte/internal";

import { writable } from "svelte/store";

function create_fragment(ctx) {
	let h1;
	let t;

	return {
		c() {
			h1 = element("h1");
			t = text(ctx.$foo);
		},
		m(target, anchor) {
			insert(target, h1, anchor);
			append(h1, t);
		},
		p(changed, ctx) {
			if (changed.$foo) set_data(t, ctx.$foo);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(h1);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $foo;
	const foo = writable(0);
	component_subscribe($$self, foo, value => $$invalidate("$foo", $foo = value));
	return { foo, $foo };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Component;