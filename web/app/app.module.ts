import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { routing } from "./app.routing";
import { removeNgStyles, createNewHosts } from "@angularclass/hmr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RiotComponent } from "./riot/riot.component";
import { ApiService } from "./shared/api.service";
import { UiSwitchModule } from "angular2-ui-switch";
import { ScalarService } from "./shared/scalar.service";
import { ToasterModule } from "angular2-toaster";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IntegrationComponent } from "./integration/integration.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        NgbModule.forRoot(),
        UiSwitchModule,
        ToasterModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        RiotComponent,
        IntegrationComponent,

        // Vendor
    ],
    providers: [
        ApiService,
        ScalarService,

        // Vendor
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
