import Cfg from '../../libs/config';

//获取全局配置的默认云服务
const default_cloud = Cfg('setting').get('default_cloud', 'tencet')

export default require('./sdk/' + default_cloud).default

