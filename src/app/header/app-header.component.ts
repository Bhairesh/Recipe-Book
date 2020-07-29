import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.css"],
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authSevice: AuthService
  ) {}

  ngOnInit() {
    this.authSevice.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.saveData();
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }

  ngOnDestroy() {}
}
