import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import CdxMenu from '../components/menu/Menu.vue';

/**
 * Find a CdxMenu component inside the given `wrapper` and return its `.cdx-menu` root element.
 *
 * Due to the use of teleport in CdxMenu, `wrapper.find( '.cdx-menu' )` doesn't work. Use this
 * function instead.
 *
 * Instead of `wrapper.find( '.cdx-menu' )`, use `getMenuRoot( wrapper )`.
 * If you're looking for an element inside the menu, then instead of
 * `wrapper.find( '.thing-inside-menu' )` use `getMenuRoot( wrapper ).find( '.thing-inside-menu' )`.
 *
 * @param wrapper Wrapper to look for a menu in
 * @return A wrapper that points to the `.cdx-menu` element of the menu
 */
export default function getMenuRoot( wrapper: VueWrapper ): DOMWrapper<HTMLDivElement> {
	return wrapper.getComponent( CdxMenu ).find( { ref: 'rootElement' } );
}
