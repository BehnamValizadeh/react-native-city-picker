# react-native-city-picker


### Documentation

#### Params

|Key | Type | Default| 
| --- | --- | ---- |
|data         | array     |            |
|defaultValue | array     | [0,0,0]    |
|onConfirm    | function  |            |
|onCanel      | fucntion  |            |


### Usage``

#### Step 1 - import and use in project

```javascript
import CityPicker from './citypicker';
import area from './area.json';
import {Drawer} from 'teaset';

//位置取消事件
    cityCanel = ()=> {
        this.draw.close();
    }

    //位置确认事件
    cityConfirm = (index,pickedValue)=> {
        console.log(pickedValue);
        console.log(index);
        // let areaData = this._getAreaId(pickedValue);
            this.setState({
                    areaValue:pickedValue,
                    areaPickedValue:index,
                    // provinceId:areaData.provinceId,
                    // cityId:areaData.cityId,
                    // areaId:areaData.areaId,
            });
        this.draw.close();
    }
    
    //拉起抽屉
    this.draw = Drawer.open(<CityPicker
            defaultValue={this.state.areaPickedValue}
            data={area}
            onConfirm={(index,pickedValue)=> this.cityConfirm(index,pickedValue)}
            onCanel={()=> this.cityCanel()}
        />,'bottom')

	
```


### Notice

#### depends
it is depend on teaset

#### data type:
the data type is area.json


