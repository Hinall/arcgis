import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new Map({
      basemap: 'satellite'
    });

    const view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [-118.80543, 34.02700],
      zoom: 13 // Set zoom level
    });

    // Create a point graphic with a popup template
    const point = new Point({
      longitude: -118.80543,
      latitude: 34.02700
    });

    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        Name: 'Example Point',
        Type: 'Type A',
        Description: 'Description of the point',
        Address: '123 Example St',
        OtherField: 'Other information'
      }
    });

    view.graphics.add(pointGraphic);

    // Add FeatureLayer to map with PopupTemplate
    const featureLayer = new FeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1',
      outFields: ["*"],
      minScale: 0,
      maxScale: 0,
      popupTemplate: {
        title: '{OBJECTID}',
        content: this.mypopup.bind(this)
      }
    });
    map.add(featureLayer);
  }

 
}

