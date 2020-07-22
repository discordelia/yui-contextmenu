# yui-contextmenu

A simple context menu component for Angular 9+.

_Documentation is work in progress._

# WARNING

* This component is written with Angular 9, so it will not work with earlier versions of Angular
* Internet Explorer is not supported.
* No RTL support.
* Partial keyboard support.
* This is a simple component I implemented for my personal project, so I cannot guarantee you with frequent updates/bug fixes.
* If you are looking for better/more professional solutions, please check out other open-source projects such as **ngx-contextmenu** or **ngx-rightclick**.

# Installation

* Install the following packages:
    
```
npm i @angular/cdk @discordelia/popup @discordelia/contextmenu
```

* Add the following line to your global stylesheet file (styles.scss)
    
```
@import "~@angular/cdk/overlay-prebuilt.css";
```

* Import **YuiContextmenuModule** in your app.module.ts file (or another module where you need it.)

# Usage

## Basic Usage

```html
<yui-contextmenu [target]="targetElement" [trigger]="'contextmenu'">
    <yui-menu-item text="Export Data">
        <yui-menu-item text="Export as XML"></yui-menu-item>
        <yui-menu-item text="Export as JSON"></yui-menu-item>
        <yui-menu-item text="Export as CSV"></yui-menu-item>
    </yui-menu-item>
    <yui-menu-item [divider]="true"></yui-menu-item>
    <yui-menu-item text="Close"></yui-menu-item>
</yui-contextmenu>

<button #targetElement>Context Menu Button</button>
```

**yui-contextmenu** accepts the following inputs.

```
target   : The target element that the context menu will be attached to.
trigger  : You can set it to 'contextmenu' or 'click' to set the trigger event. Default is set to 'contextmenu'.
menuClass: You can pass a string of css classes to help you style the menu.
```

* Inside yui-contextmenu tag, you can define multiple yui-menu-item components.
* Inside yui-menu-item tag, you can define multiple yui-menu-item components for a submenu.
* If, for example, you passed **'export-menu'** as menuClass input, you can then use the following code to help you style the menu.

```scss
yui-contextmenu-content.export-menu {
    /* Your style rules */
}
```

**yui-menu-item** accepts the following inputs and outputs.

```typescript
disabled: boolean                   // Disable a menu item.
divider: boolean                    // Set a menu item as divider. When set to true, all other options are ignored.
icon: string;                       // Icon class for menu item. For example, you can pass a font icon class such as 'fa fa-plus'. Ignored when iconTemplate option is set.
iconTemplate: TemplateRef<any>;     // Pass a template reference to show as menu item icon.
image: string;                      // Image url for menu item icon. Ignored when imageTemplate option is set.
imageTemplate: TemplateRef<any>;    // Pass a template reference to show as menu item image icon.
select: EventEmitter<IMenuItem>;    // Called when a menu item is selected. 
text: string;                       // Menu item text. Ignored when textTemplate option is set.
textTemplate: TemplateRef<any>;     // Pass a template reference to show as menu item text.
toggleable: boolean;                // Pass true if you want to make the menu item toggleable.
toggled: boolean;                   // Set toggle status of menu item. This is a two-way binding. [(toggled)]
visible: boolean;                   // Set false to hide a menu item.
```

# License

MIT
