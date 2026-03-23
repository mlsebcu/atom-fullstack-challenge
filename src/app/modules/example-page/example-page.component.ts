import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ROUTE_PATHS } from "../../shared/constants/app.constants";

@Component({
    selector: "app-example-page",
    standalone: true,
    imports: [
        MatIcon,
        NgOptimizedImage
    ],
    templateUrl: "./example-page.component.html",
    styleUrl: "./example-page.component.scss"
})
export class ExamplePageComponent {
    constructor(private router: Router) {}

    onBackToTasks(): void {
        this.router.navigate([ROUTE_PATHS.TASKS]);
    }
}
