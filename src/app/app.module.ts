import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { AppHeaderComponent } from "./header/app-header.component";
import { AppRoutingModule } from "./app-routing.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [AppComponent, AppHeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
