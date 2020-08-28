import { LocationPickerComponent } from "./pickers/location-picker/location-picker.component";
import { MapModelComponent } from "./map-model/map-model.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [LocationPickerComponent, MapModelComponent],
  imports: [CommonModule, IonicModule],
  exports: [LocationPickerComponent, MapModelComponent],
  entryComponents: [MapModelComponent],
})
export class SharedModule {}
