import {Overlay, Wheel} from "teaset";
import {Text, View,TouchableOpacity} from "react-native";
import React,{Component} from "react";
import * as Constant from '../../../constant/constant';
import PropTypes from 'prop-types';


export default class CityPicker extends Component{

    constructor(props){
        super(props);

        this.state = {
            data:[],                //数据
            provinceArr:[],         //省数组
            cityArr:[],             //市数组
            areaArr:[],             //区数组
        };
        this.provinceSelcetedIndex = 0;
        this.citySelcetedIndex = 0;
        this.areaSelcetedIndex = 0;

        this.provinceIndex = 0;     //省索引
        this.cityIndex = 0;         //市索引
        this.areaIndex = 0;         //区索引
    }

    componentWillMount(){
        this.props.defaultValue && this.getDefaultValue();
        this.props.data && this.getData();
    }

    //获取数据并且处理数组
    getData(){
        //获取省数组
        let parr = this.getParr();
        //获取市数组
        let carr = this.getCarr(this.props.defaultValue[0]);
        //获取区数组
        let aarr = this.getAarr(this.props.defaultValue[0],this.props.defaultValue[1]);

        this.setState({
            data:this.props.data,
            provinceArr:parr,
            cityArr:carr,
            areaArr:aarr,
        })
    }

    //获取省数组
    getParr(){
        let arr = this.props.data;
        let tmpArr = [];
        for(let i=0; i<arr.length; i++){
            tmpArr.push(arr[i].name);
        }

        return tmpArr;
    }

    //获取市数组
    getCarr(index){
        let arr = this.props.data;
        let tmpArr = [];
        for(let i=0; i<arr[index]['children'].length; i++){
            tmpArr.push(arr[index]['children'][i].name);
        }
        return tmpArr;
    }

    //获取区数组
    //获取市数组
    getAarr(pindex,cindex){
        let arr = this.props.data;
        let tmpArr = [];
        for(let i=0; i<arr[pindex]['children'][cindex]['children'].length; i++){
            tmpArr.push(arr[pindex]['children'][cindex]['children'][i].name);
        }
        return tmpArr;
    }

    //如果有默认值就用他
    getDefaultValue(){

        this.provinceSelcetedIndex = this.props.defaultValue[0] || 0;
        this.citySelcetedIndex = this.props.defaultValue[1] || 0;
        this.areaSelcetedIndex = this.props.defaultValue[2] || 0;
        this.provinceIndex = this.props.defaultValue[0] || 0;
        this.cityIndex = this.props.defaultValue[1] || 0;
        this.areaIndex = this.props.defaultValue[2] || 0;
    }

    //省改变事件
    pchange = (index)=> {
        this.provinceIndex = index;
        this.provinceSelcetedIndex = index;
        this.citySelcetedIndex = 0;
        this.cityIndex = 0;
        this.areaSelcetedIndex = 0;
        this.areaIndex = 0;
        //获取市数组
        let carr = this.getCarr(this.provinceIndex);
        //获取区数组
        let aarr = this.getAarr(this.provinceIndex,this.cityIndex);

        this.setState({
            cityArr:carr,
            areaArr:aarr,
        })
    }

    //市改变事件
    cchange = (index)=> {
        this.cityIndex = index;
        this.citySelcetedIndex = index;
        this.areaSelcetedIndex = 0;
        this.areaIndex = 0;
        //获取区数组
        let aarr = this.getAarr(this.provinceIndex,this.cityIndex);
        console.log(this.provinceIndex);
        console.log(this.cityIndex);

        this.setState({
            areaArr:aarr,
        })
    }

    //区改变事件
    achange = (index)=> {
        this.areaIndex = index;
        this.areaSelcetedIndex = index;
        console.log(this.provinceIndex);
        console.log(this.cityIndex);
        console.log(this.areaIndex);
    }

    //通过索引值获取字符数组
    getResult(){
        let arr = [];
        arr.push(this.state.provinceArr[this.provinceIndex]);
        arr.push(this.state.cityArr[this.cityIndex]);
        arr.push(this.state.areaArr[this.areaIndex]);

        return arr.join(' ');
    }

    //获取索引数组
    getIndex(){
        let arr = [];
        arr.push(this.provinceIndex);
        arr.push(this.cityIndex);
        arr.push(this.areaIndex);

        return arr;
    }

    //确认事件
    pickerConfirm = ()=> {
        let index = this.getIndex();
        let pickedValue = this.getResult();
        this.props.onConfirm && this.props.onConfirm(index,pickedValue);
    }


    render(){
        return(
            <View>
                <View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems: 'center',
                        padding:10
                    }}>
                        <TouchableOpacity onPress={()=> {
                            this.props.onCanel && this.props.onCanel();
                        }}>
                            <Text style={{fontSize:Constant.middleTextWhite,color:Constant.primaryColor}}>取消</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:Constant.middleTextWhite,fontWeight: 'bold',color:'#000'}}>位置选择</Text>
                        <TouchableOpacity onPress={()=> this.pickerConfirm()}>
                            <Text style={{fontSize:Constant.middleTextWhite,color:Constant.primaryColor}}>确认</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems:'center',
                    }}>
                        <Wheel
                            style={{height: 200, width: 80,flex:1,backgroundColor:'#ccc'}}
                            itemStyle={{textAlign: 'center',fontSize:Constant.middleTextWhite}}
                            items={this.state.provinceArr}
                            defaultIndex={this.props.defaultValue[0]}
                            onChange={(index)=> this.pchange(index)}
                        />
                        <Wheel
                            style={{height: 200, width: 80,flex:1,backgroundColor:'#ccc'}}
                            itemStyle={{textAlign: 'center',fontSize:Constant.middleTextWhite}}
                            items={this.state.cityArr}
                            index={this.citySelcetedIndex}
                            defaultIndex={this.props.defaultValue[1]}
                            onChange={(index)=> this.cchange(index)}
                        />
                        <Wheel
                            style={{height: 200, width: 80,flex:1,backgroundColor:'#ccc'}}
                            itemStyle={{textAlign: 'center',fontSize:Constant.middleTextWhite}}
                            items={this.state.areaArr}
                            index={this.areaSelcetedIndex}
                            defaultIndex={this.props.defaultValue[2]}
                            onChange={(index)=> this.achange(index)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

CityPicker.PropTypes = {
    defaultValue:PropTypes.array,
    data:PropTypes.array,
    onConfirm:PropTypes.func,
    onCanel:PropTypes.func,
}



