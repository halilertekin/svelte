import {
	SvelteComponent,
	destroy_component,
	init,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

function create_fragment(ctx) {
	let current;
	const nested = new ctx.Nested({ props: { foo: [1, 2, 3] } });

	return {
		c() {
			nested.$$.fragment.c();
		},
		m(target, anchor) {
			mount_component(nested, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(nested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(nested, detaching);
		}
	};
}

function instance($$self) {
	const Nested = window.Nested;
	return { Nested };
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, []);
	}
}

export default Component;