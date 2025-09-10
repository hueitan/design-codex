/**
 * SVGO plugin that removes the outer `<svg>` tag aka element.
 *
 * @type {import('svgo').CustomPlugin}
 */
export default {
	name: 'removeSvgTag',
	fn() {
		return {
			root: {
				// Unwrap the top-level <svg> element from the root node
				// and return its contents
				enter( rootNode ) {
					const svgTag = rootNode.children[ 0 ];
					if ( svgTag.type === 'element' ) {
						rootNode.children = svgTag.children;
					}
					return rootNode;
				}
			}
		};
	}
};
