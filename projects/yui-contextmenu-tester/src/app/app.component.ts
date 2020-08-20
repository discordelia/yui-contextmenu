import {Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {faCoffee, faEye, faPlus, faTrash, faEdit, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {IMenuItem, IContextMenuData, IMenuChangeEvent, IMenuOpenEvent, IMenuCloseEvent} from "yui-contextmenu";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    private disabled: boolean = true;
    private editLocalHidden: boolean = true;
    public coffeeIcon = faCoffee;
    public addIcon = faPlus;
    public deleteIcon = faTrash;
    public viewIcon = faEye;
    public editIcon = faEdit;
    public dropdownIcon = faChevronDown;
    public bgColor: string = "#fff";

    public iconTest: string = "fa fa-plus";
    public iconTemplateTest: TemplateRef<any>;
    public menuText: number = 1;
    public disabledTest: boolean = false;
    public toggleTest: boolean = false;
    public visibleTest: boolean = true;

    public contextMenuTargetElement: HTMLElement = null;
    public menuEvent: MouseEvent;
    public menuTriggerType: string = "contextmenu";

    @ViewChild("coffeeIconTemplate") coffeeIconTemplate: TemplateRef<any>;
    @ViewChild("addIconTemplate") addIconTemplate: TemplateRef<any>;
    @ViewChild("editIconTemplate") editIconTemplate: TemplateRef<any>;
    @ViewChild("deleteIconTemplate") deleteIconTemplate: TemplateRef<any>;
    @ViewChild("viewIconTemplate") viewIconTemplate: TemplateRef<any>;
    @ViewChild("deleteTextTemplate") deleteTextTemplate: TemplateRef<any>;

    public menuItems: IMenuItem[] = [
        {
            text: "Add"
        },
        {
            iconTemplate: () => this.coffeeIconTemplate,
            text: "Analyze"
        },
        {
            text: "Edit",
            iconTemplate: () => this.editIconTemplate,
            menuItems: [
                {
                    // action: () => void 0,
                    text: "Edit Locally",
                    visible: !this.editLocalHidden,
                    select: (item) => {
                        this.menuItems[2].menuItems[0].visible = false;
                        this.menuItems[2].menuItems[1].visible = true;
                    }
                },
                {
                    // action: () => void 0,
                    text: "Edit Remotely",
                    visible: this.editLocalHidden,
                    select: (item) => {
                        this.menuItems[2].menuItems[0].visible = true;
                        this.menuItems[2].menuItems[1].visible = false;
                    }
                },
                {
                    iconTemplate: () => this.editIconTemplate,
                    // action: () => void 0,
                    text: "Edit and Save"
                },
                {
                    // action: () => void 0,
                    text: "Edit and Push"
                },
                {
                    text: "Edit and Preview",
                    iconTemplate: () => this.viewIconTemplate,
                    menuItems: [
                        {
                            // action: () => this.disabled = !this.disabled,
                            text: "Preview Via New Window"
                        },
                        {
                            // action: () => void 0,
                            text: "Preview on Popup"
                        },
                        {
                            iconTemplate: () => this.viewIconTemplate,
                            // action: () => void 0,
                            text: "Preview In-line"
                        }
                    ]
                }
            ]
        },
        {
            text: "Check for updates"
        },
        {
            text: "Delete",
            iconTemplate: () => this.deleteIconTemplate,
            textTemplate: () => this.deleteTextTemplate,
            menuItems: [
                {
                    text: "Delete Local",
                    select: (item: IMenuItem) => {
                        console.log(item);
                        console.log(this.viewIcon);
                    }
                },
                {
                    text: "Delete Remote",
                    disabled: true
                }
            ]
        }
    ];

    ngOnInit(): void {
        this.updateMenuText();
    }

    public changeBgColor(): void {
        this.createRandomColor();
        (document.querySelector("body") as HTMLBodyElement).style.backgroundColor = this.bgColor;
    }

    public openDynamicContextMenu(event: MouseEvent): void {
        event.preventDefault();
        this.contextMenuTargetElement = (event.target as HTMLElement);
        this.menuEvent = event;
    }

    public onMenuChange(event: IMenuChangeEvent): void {
        console.log("MENU CHANGED: ", event);
    }

    public onMenuClose(event: IMenuOpenEvent): void {
        console.log("MENU CLOSED: ", event);
    }

    public onMenuOpen(event: IMenuCloseEvent): void {
        console.log("MENU OPENED: ", event);
    }

    public clickTest(): void {
        console.log("Click went through disabled.");
    }

    public updateMenuText(): void {
        window.setInterval(() => {
            this.menuText++;
            // this.disabledTest = !this.disabledTest;
            // this.visibleTest = !this.visibleTest;
            // this.iconTest = this.iconTest.includes("plus") ? "fa fa-minus" : "fa fa-plus"
            // this.iconTemplateTest = this.iconTemplateTest === this.coffeeIconTemplate ? this.viewIconTemplate : this.coffeeIconTemplate;
        }, 1000);
    }


    public selectTestMethod(item: IMenuItem): void {
        console.log("MENUITEM: ", item);
    }

    private createRandomColor(): void {
        this.bgColor = "#000000".replace(/0/g, () => {
            // tslint:disable-next-line:no-bitwise
            return (~~(Math.random() * 16)).toString(16);
        });
    }
}
