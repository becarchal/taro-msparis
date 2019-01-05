import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
// import { AtButton, AtInput, AtForm } from 'taro-ui' // taro-ui用法
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
import './index.scss';

@connect(({ home, cart, loading }) => ({
  ...home,
  ...cart,
  ...loading,
}))
export default class Index extends Component {
  // 页面配置
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
    });
    this.props.dispatch({
      type: 'home/product',
    });

    // 设置衣袋小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length),
      })
    }else {
      Taro.removeTabBarBadge({
        index: 1,
      })
    }
  };

  //分享
  onShareAppMessage() {
    return {
      title: '基于Taro框架开发的时装衣橱',
      path: '/pages/home/index',
    }
  };
  // Page 组件详细属性见 https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
  // 小程序下拉刷新
  onPullDownRefresh () {
    console.log('刷新数据')
    Taro.stopPullDownRefresh() // 停止刷新
  }

  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.props.dispatch({
      type: 'home/product',
    });
  }

  render() {
    const { banner, brands, products_list, effects } = this.props;
    return (
      <View className='home-page'>
        {/* taro-ui用法 */}
        {/* <AtForm>
          <AtInput name='amount' title='支数' type='number' placeholder='每天吸烟支数' value={1} onChange={this.onAmount} />
          <AtInput name='unitprice' title='单价' type='number' placeholder='香烟单价' value={1} onChange={this.onUnitprice} />
          <AtInput name='unitamount' title='每包支数' type='number' placeholder='每包烟支数' value={1} onChange={this.onUnitamount} />
          <View className='btn-item'>
            <AtButton type='primary' onClick={this.onSubmit}>提交</AtButton>
            <AtButton type='secondary' onClick={this.onBack}>返回</AtButton>
          </View>
        </AtForm> */}
        <MySwiper banner={banner} home />
        <View className='nav-list'>
          { brands.map((item, index) => (
            <View className='nav-item' key={index}>
              <Image mode='widthFix' src={item.image_src}></Image>
            </View>
          ))}
        </View>
        <Text className='recommend'>为你推荐</Text>
        <GoodsList list={products_list} loading={effects['home/product']} />
      </View>
    )
  }
}

