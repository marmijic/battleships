import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent, PlayersListComponent } from "./component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "players", component: PlayersListComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
