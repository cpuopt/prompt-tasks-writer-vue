function convertToMap(obj) {
    // 创建一个新的 Map
    const map = new Map();

    // 遍历对象的键值对
    for (const [key, value] of Object.entries(obj)) {
        // 如果值是一个对象且不是数组，则递归转换它
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            map.set(key, convertToMap(value));
        } else {
            // 否则直接设置键值对
            map.set(key, value);
        }
    }

    return map;
}
function convertToObject(map) {
    if (map === undefined || map === null) {
        return map;
    }
    const obj = {};
    for (const [key, value] of map.entries()) {
        if (value instanceof Map) {
            obj[key] = convertToObject(value);
        } else if (Array.isArray(value)) {
            obj[key] = value.map((item) => {
                if (item instanceof Map) {
                    return convertToObject(item);
                } else {
                    return item;
                }
            });
        } else {
            obj[key] = value;
        }
    }
    return obj;
}
const obj_tags = {
    人物: {
        对象: [
            {
                local: '1女孩',
                raw: '1girl'
            },
            {
                local: '1男孩',
                raw: '1boy'
            },
            {
                local: '2女孩',
                raw: '2girls'
            },
            {
                local: '2男孩',
                raw: '2boys'
            },
            {
                local: '3女孩',
                raw: '3girls'
            },
            {
                local: '3男孩',
                raw: '3boys'
            },
            {
                local: '女孩',
                raw: 'girl'
            },
            {
                local: '男孩',
                raw: 'boy'
            },
            {
                local: '单人',
                raw: 'solo'
            },
            {
                local: '多个女孩',
                raw: 'multiple_girls'
            },
            {
                local: '小女孩',
                raw: 'little_girl'
            },
            {
                local: '小男孩',
                raw: 'little_boy'
            },
            {
                local: '正太',
                raw: 'shota'
            },
            {
                local: '萝莉',
                raw: 'loli'
            },
            {
                local: '可爱',
                raw: 'kawaii'
            },
            {
                local: '雌小鬼',
                raw: 'mesugaki'
            },
            {
                local: '可爱的女孩',
                raw: 'adorable_girl'
            },
            {
                local: '美少女',
                raw: 'bishoujo'
            },
            {
                local: '辣妹',
                raw: 'gyaru'
            },
            {
                local: '姐妹',
                raw: 'sisters'
            },
            {
                local: '大小姐',
                raw: 'ojousama'
            },
            {
                local: '女性',
                raw: 'female'
            },
            {
                local: '成熟女性',
                raw: 'mature_female'
            },
            {
                local: '成熟',
                raw: 'mature'
            },
            {
                local: '痴女',
                raw: 'female_pervert'
            },
            {
                local: '男性',
                raw: 'male'
            },
            {
                local: '熟女',
                raw: 'milf'
            },
            {
                local: '伪娘',
                raw: 'otoko_no_ko'
            },
            {
                local: '伪娘',
                raw: 'crossdressing'
            }
        ],
        身份: [
            {
                local: '救生员',
                raw: 'lifeguard'
            },
            {
                local: '拳击手',
                raw: 'boxer'
            },
            {
                local: '科学家',
                raw: 'scientist'
            },
            {
                local: '运动员',
                raw: 'athletes'
            },
            {
                local: '职场女性',
                raw: 'office lady'
            },
            {
                local: '和尚',
                raw: 'monk'
            },
            {
                local: '杂技演员',
                raw: 'acrobat'
            },
            {
                local: '修女',
                raw: 'nun'
            },
            {
                local: '护士',
                raw: 'nurse'
            },
            {
                local: '空姐',
                raw: 'stewardess'
            },
            {
                local: '学生',
                raw: 'student'
            },
            {
                local: '女服务员',
                raw: 'waitress'
            },
            {
                local: '老师',
                raw: 'teacher'
            },
            {
                local: '赛车手',
                raw: 'racer'
            },
            {
                local: '警察',
                raw: 'police'
            },
            {
                local: '士兵',
                raw: 'soldier'
            },
            {
                local: '啦啦队',
                raw: 'cheerleader'
            },
            {
                local: '男演员',
                raw: 'actor'
            },
            {
                local: '女演员',
                raw: 'actress'
            },
            {
                local: '间谍',
                raw: 'spy'
            },
            {
                local: '特工',
                raw: 'agent'
            },
            {
                local: '刺客',
                raw: 'assassin'
            },
            {
                local: '诗人',
                raw: 'poet'
            },
            {
                local: '日本武士',
                raw: 'samurai'
            },
            {
                local: '舞女',
                raw: 'dancing girl'
            },
            {
                local: '摩托车手',
                raw: 'motorcyclist'
            },
            {
                local: '黑客',
                raw: 'hacker'
            },
            {
                local: '魔术师',
                raw: 'magician'
            },
            {
                local: '侦探',
                raw: 'detective'
            },
            {
                local: '人偶',
                raw: 'doll'
            },
            {
                local: '女仆',
                raw: 'maid'
            },
            {
                local: '飞行员',
                raw: 'pilot'
            },
            {
                local: '潜水员',
                raw: 'diver'
            },
            {
                local: '酒吧审查员',
                raw: 'bar censor'
            },
            {
                local: '传教士',
                raw: 'missionary'
            },
            {
                local: '消防员',
                raw: 'firefighter'
            },
            {
                local: '守门员',
                raw: 'goalkeeper'
            },
            {
                local: '厨师',
                raw: 'chef'
            },
            {
                local: '宇航员',
                raw: 'astronaut'
            },
            {
                local: '收银员',
                raw: 'cashier'
            },
            {
                local: '邮递员',
                raw: 'mailman'
            },
            {
                local: '咖啡师',
                raw: 'barista'
            },
            {
                local: '隐士',
                raw: 'the hermit'
            },
            {
                local: '牧羊人',
                raw: 'makihitsuji'
            },
            {
                local: '办公室小姐',
                raw: 'office_lady'
            },
            {
                local: '赛车女郎',
                raw: 'race_queen'
            },
            {
                local: '女王',
                raw: 'queen'
            },
            {
                local: '医生',
                raw: 'doctor'
            },
            {
                local: '骑士',
                raw: 'knight'
            },
            {
                local: '女仆',
                raw: 'housemaid'
            },
            {
                local: '舞者',
                raw: 'dancer'
            },
            {
                local: '芭蕾舞演员',
                raw: 'ballerina'
            },
            {
                local: '体操教练',
                raw: 'gym_leader'
            },
            {
                local: '伪娘',
                raw: 'trap'
            },
            {
                local: '女人',
                raw: 'female'
            },
            {
                local: '后宫',
                raw: 'harem'
            },
            {
                local: '偶像',
                raw: 'idol'
            },
            {
                local: '男人',
                raw: 'male'
            },
            {
                local: '牧师',
                raw: 'priest'
            },
            {
                local: '神职人员(基督教)',
                raw: 'cleric'
            },
            {
                local: '和风女仆',
                raw: 'wa_maid'
            },
            {
                local: '搞基',
                raw: 'yaoi'
            },
            {
                local: '百合',
                raw: 'yuri'
            },
            {
                local: '白化病患者',
                raw: 'albino'
            },
            {
                local: '截肢者',
                raw: 'amputee'
            }
        ],
        二次元角色: [
            {
                local: '宝可梦',
                raw: 'pokemon'
            },
            {
                local: '泰迪熊',
                raw: 'teddy bear'
            },
            {
                local: '马里奥',
                raw: 'mario'
            },
            {
                local: '皮卡丘',
                raw: 'pikachu'
            },
            {
                local: '新世纪福音战士',
                raw: 'neon genesis evangelion'
            },
            {
                local: '初音未来',
                raw: 'hatsune miku'
            },
            {
                local: '哈利波特',
                raw: 'harry potter'
            },
            {
                local: '哆啦A梦',
                raw: 'doraemon'
            },
            {
                local: '圣斗士星矢',
                raw: 'saint seiya'
            },
            {
                local: '五条悟',
                raw: 'gojou satoru'
            },
            {
                local: '复仇者联盟',
                raw: 'avengers'
            },
            {
                local: '神奇女侠',
                raw: 'mazinger'
            },
            {
                local: '美国队长',
                raw: 'captain america'
            },
            {
                local: '蜡笔小新',
                raw: 'crayon shin-chan'
            },
            {
                local: '灌篮高手',
                raw: 'slam dunk'
            },
            {
                local: '孙悟空',
                raw: 'sun wukong'
            },
            {
                local: '女巫',
                raw: 'witch'
            },
            {
                local: '巫女',
                raw: 'miko'
            },
            {
                local: '忍者',
                raw: 'ninja'
            },
            {
                local: '吸血鬼',
                raw: 'vampire'
            },
            {
                local: '骑士',
                raw: 'knight'
            },
            {
                local: '魔法少女',
                raw: 'magical_girl'
            },
            {
                local: '半兽人',
                raw: 'orc'
            },
            {
                local: '德鲁伊',
                raw: 'druid'
            },
            {
                local: '妖精',
                raw: 'elf'
            },
            {
                local: '小精灵',
                raw: 'fairy'
            },
            {
                local: '兽人',
                raw: 'furry'
            },
            {
                local: '美人鱼',
                raw: 'mermaid'
            },
            {
                local: '假面骑士',
                raw: 'kamen rider'
            },
            {
                local: '魔导师',
                raw: 'magister'
            },
            {
                local: '蜘蛛侠',
                raw: 'spider-man'
            },
            {
                local: '圣诞老人',
                raw: 'santa alter'
            },
            {
                local: '人外娘',
                raw: 'monster_girl'
            },
            {
                local: '猫娘',
                raw: 'cat_girl'
            },
            {
                local: '犬娘',
                raw: 'dog_girl'
            },
            {
                local: '狐娘',
                raw: 'fox_girl'
            },
            {
                local: '狐妖',
                raw: 'kitsune'
            },
            {
                local: '九尾|九尾狐',
                raw: 'kyuubi'
            },
            {
                local: '浣熊娘',
                raw: 'raccoon_girl'
            },
            {
                local: '狼女孩',
                raw: 'wolf_girl'
            },
            {
                local: '兔娘',
                raw: 'bunny_girl'
            },
            {
                local: '马娘',
                raw: 'horse_girl'
            },
            {
                local: '牛娘',
                raw: 'cow_girl'
            },
            {
                local: '龙娘',
                raw: 'dragon_girl'
            },
            {
                local: '半人马',
                raw: 'centaur'
            },
            {
                local: '史莱姆娘',
                raw: 'slime_musume'
            },
            {
                local: '蜘蛛娘',
                raw: 'spider_girl'
            },
            {
                local: '女王(SM中)',
                raw: 'dominatrix'
            },
            {
                local: '美少女战士',
                raw: 'sailor_senshi'
            },
            {
                local: '机甲',
                raw: 'mecha'
            },
            {
                local: '机甲娘',
                raw: 'mecha_musume'
            },
            {
                local: '类人机器人',
                raw: 'humanoid_robot_'
            },
            {
                local: '半机械人',
                raw: 'cyborg'
            },
            {
                local: '天使',
                raw: 'angel'
            },
            {
                local: '魔鬼',
                raw: 'devil'
            },
            {
                local: '暗精灵',
                raw: 'dark_elf'
            },
            {
                local: '小恶魔',
                raw: 'imp'
            },
            {
                local: '魅魔',
                raw: 'succubus'
            },
            {
                local: '女巨人',
                raw: 'giantess'
            },
            {
                local: '迷你女孩',
                raw: 'minigirl'
            },
            {
                local: '怪物',
                raw: 'monster'
            },
            {
                local: '非人',
                raw: 'no humans'
            }
        ],
        年龄: [
            {
                local: '幼童',
                raw: 'toddler'
            },
            {
                local: '幼儿园',
                raw: 'kindergartener'
            },
            {
                local: '儿童',
                raw: 'child'
            },
            {
                local: '未成年',
                raw: 'underage'
            },
            {
                local: '青少年(13-19)',
                raw: 'teenager'
            },
            {
                local: '青少年(13-19)',
                raw: 'teen'
            },
            {
                local: '青少年早期（11-15）',
                raw: 'early teen'
            },
            {
                local: '大人',
                raw: 'adult'
            },
            {
                local: '老人',
                raw: 'elder'
            },
            {
                local: '老年',
                raw: 'old'
            },
            {
                local: '萝莉',
                raw: 'loli'
            },
            {
                local: '正太',
                raw: 'shota'
            }
        ],
        皮肤: [
            {
                local: '白皮肤',
                raw: 'white_skin'
            },
            {
                local: '苍白的皮肤',
                raw: 'pale_skin'
            },
            {
                local: '白皙的皮肤',
                raw: 'fair_skin'
            },
            {
                local: '棕色皮肤',
                raw: 'brown_skin'
            },
            {
                local: '深色皮肤',
                raw: 'deep_skin'
            },
            {
                local: '黑皮肤',
                raw: 'dark_skin'
            },
            {
                local: '黑皮肤',
                raw: 'black_skin'
            },
            {
                local: '有光泽的皮肤',
                raw: 'shiny_skin'
            },
            {
                local: '白色大理石发光皮肤',
                raw: 'white_marble_glowing_skin'
            },
            {
                local: '纹身',
                raw: 'tattoo'
            },
            {
                local: '日晒',
                raw: 'tan'
            },
            {
                local: '日晒痕迹',
                raw: 'tanlines'
            },
            {
                local: '油性',
                raw: 'oil'
            }
        ],
        身材: [
            {
                local: '骨感',
                raw: 'skinny'
            },
            {
                local: '丰满',
                raw: 'plump'
            },
            {
                local: '魔鬼身材',
                raw: 'curvy'
            },
            {
                local: '辣妹(日本太妹)',
                raw: 'gyaru'
            },
            {
                local: '怀孕',
                raw: 'pregnant'
            },
            {
                local: '肥胖',
                raw: 'fat'
            },
            {
                local: '瘦',
                raw: 'thin'
            },
            {
                local: '苗条',
                raw: 'slender'
            },
            {
                local: '魅力',
                raw: 'glamor'
            },
            {
                local: '高大',
                raw: 'tall'
            },
            {
                local: '娇小',
                raw: 'petite'
            },
            {
                local: '萌萌',
                raw: 'chibi'
            },
            {
                local: '肌肉',
                raw: 'muscular'
            }
        ],
        脸型: [
            {
                local: '瘦脸',
                raw: 'slender face'
            },
            {
                local: '圆脸',
                raw: 'round face'
            },
            {
                local: '鹅蛋脸',
                raw: 'oval face'
            },
            {
                local: '娃娃脸',
                raw: 'baby face'
            },
            {
                local: '倒三角脸',
                raw: 'inverted triangle face'
            },
            {
                local: '心形脸',
                raw: 'heart shaped face'
            },
            {
                local: '菱形脸',
                raw: 'diamond face'
            },
            {
                local: '方脸',
                raw: 'square face'
            },
            {
                local: '长脸',
                raw: 'long face'
            },
            {
                local: '三角脸',
                raw: 'triangular face'
            }
        ],
        头发: [
            {
                local: '白色头发',
                raw: 'white hair'
            },
            {
                local: '金色头发',
                raw: 'blonde hair'
            },
            {
                local: '银色头发',
                raw: 'silver hair'
            },
            {
                local: '灰色头发',
                raw: 'grey hair'
            },
            {
                local: '紫色头发',
                raw: 'purple hair'
            },
            {
                local: '红色头发',
                raw: 'red hair'
            },
            {
                local: '黄色头发',
                raw: 'yellow hair'
            },
            {
                local: '绿色头发',
                raw: 'green hair'
            },
            {
                local: '蓝色头发',
                raw: 'blue hair'
            },
            {
                local: '黑色头发',
                raw: 'black hair'
            },
            {
                local: '棕色头发',
                raw: 'brown hair'
            },
            {
                local: '直发',
                raw: 'straight_hair'
            },
            {
                local: '短发',
                raw: 'short hair'
            },
            {
                local: '卷发',
                raw: 'curly hair'
            },
            {
                local: '长发',
                raw: 'long hair'
            },
            {
                local: '马尾',
                raw: 'pony-tail'
            },
            {
                local: '双马尾',
                raw: 'bunches'
            },
            {
                local: '挑染',
                raw: 'streaked hair'
            },
            {
                local: '灰色渐变',
                raw: 'grey gradient hair'
            },
            {
                local: '亮棕',
                raw: 'light brown hair'
            },
            {
                local: '双色',
                raw: 'two-tone hair'
            },
            {
                local: '五颜六色',
                raw: 'multicolored hair'
            },
            {
                local: '高马尾',
                raw: 'high ponytail'
            },
            {
                local: '双马尾二',
                raw: 'twintails'
            },
            {
                local: '马尾编发',
                raw: 'braided ponytail'
            },
            {
                local: '马尾辫',
                raw: 'ponytail'
            },
            {
                local: '短马尾',
                raw: 'short ponytail'
            },
            {
                local: '双辫子',
                raw: 'twin braids'
            },
            {
                local: '中发',
                raw: 'medium hair'
            },
            {
                local: '超长发',
                raw: 'very long hair'
            },
            {
                local: '辫子刘海',
                raw: 'braided bangs'
            },
            {
                local: '侧扫刘海',
                raw: 'swept bangs'
            },
            {
                local: '眼间头发',
                raw: 'hair between eyes'
            },
            {
                local: '妹妹切',
                raw: 'bob cut'
            },
            {
                local: '公主切',
                raw: 'hime cut'
            },
            {
                local: '交叉刘海',
                raw: 'crossed bangs'
            },
            {
                local: '刘海',
                raw: 'bangs'
            },
            {
                local: '齐刘海',
                raw: 'blunt bangs'
            },
            {
                local: '空气刘海',
                raw: 'air bangs'
            },
            {
                local: '翼状头发',
                raw: 'hair wings'
            },
            {
                local: '长刘海',
                raw: 'long bangs'
            },
            {
                local: '侧面空气刘海',
                raw: 'side_blunt_bangs'
            },
            {
                local: '中分刘海',
                raw: 'centre parting bangs'
            },
            {
                local: '不对称刘海',
                raw: 'asymmetric bangs'
            },
            {
                local: '蓬发',
                raw: 'disheveled hair'
            },
            {
                local: '波浪形头发',
                raw: 'wavy hair'
            },
            {
                local: '收拢',
                raw: 'hair in takes'
            },
            {
                local: '粉色花',
                raw: 'hair pink flowers'
            },
            {
                local: '呆毛',
                raw: 'ahoge'
            },
            {
                local: '多根呆毛',
                raw: 'antenna hair'
            },
            {
                local: '侧马尾',
                raw: 'Side ponytail'
            },
            {
                local: '露额头',
                raw: 'forehead'
            },
            {
                local: '钻头卷公主卷',
                raw: 'drill hair'
            },
            {
                local: '包子头',
                raw: 'hair bun'
            },
            {
                local: '俩包子头',
                raw: 'double bun'
            },
            {
                local: '凌乱发型',
                raw: 'messy hair'
            },
            {
                local: '发翼',
                raw: 'hair_flaps'
            }
        ],
        面部: [
            {
                local: '化妆',
                raw: 'makeup'
            },
            {
                local: '粉底',
                raw: 'fundoshi'
            },
            {
                local: '眼影',
                raw: 'eyeshadow'
            },
            {
                local: '口红',
                raw: 'lipstick'
            },
            {
                local: '睫毛膏',
                raw: 'mascara'
            },
            {
                local: '长睫毛',
                raw: 'long_eyelashes'
            },
            {
                local: '红唇',
                raw: 'red_lips_'
            },
            {
                local: '面部涂装',
                raw: 'facepaint'
            },
            {
                local: '唇彩',
                raw: 'lipgloss'
            },
            {
                local: '彩色睫毛',
                raw: 'colored_eyelashes'
            },
            {
                local: '脸红',
                raw: 'blush'
            },
            {
                local: '淡淡的腮红',
                raw: 'light_blush'
            },
            {
                local: '动画式脸红',
                raw: 'anime_style_blush'
            },
            {
                local: '鼻腮红',
                raw: 'nose_blush'
            },
            {
                local: '鼻血',
                raw: 'nosebleed'
            },
            {
                local: '脸上有瘀伤',
                raw: 'bruise_on_face'
            },
            {
                local: '面部标记',
                raw: 'facial_mark'
            },
            {
                local: '额头标记',
                raw: 'forehead_mark'
            },
            {
                local: '头部愤怒符号',
                raw: 'anger_vein'
            },
            {
                local: '痣',
                raw: 'mole'
            },
            {
                local: '眼睛下方的痣',
                raw: 'mole_under_eye'
            },
            {
                local: '雀斑',
                raw: 'freckles'
            },
            {
                local: '食物在脸上',
                raw: 'food_on_face'
            },
            {
                local: '饭在脸上',
                raw: 'rice_on_face'
            },
            {
                local: '奶油在脸上',
                raw: 'cream_on_face'
            },
            {
                local: '小胡子',
                raw: 'mustache'
            },
            {
                local: '山羊胡',
                raw: 'goatee'
            },
            {
                local: '胡须斑纹',
                raw: 'whisker_markings'
            },
            {
                local: '疤痕',
                raw: 'scar'
            },
            {
                local: '穿过眼睛的疤痕',
                raw: 'scar_across_eye'
            },
            {
                local: '烟斗',
                raw: 'smoking_pipe'
            },
            {
                local: '纹身',
                raw: 'tattoo'
            }
        ],
        耳朵: [
            {
                local: '精灵耳朵',
                raw: 'elf ears'
            },
            {
                local: '动物耳朵',
                raw: 'fake animal ears'
            },
            {
                local: '猫耳朵',
                raw: 'cat ears'
            },
            {
                local: '狗耳朵',
                raw: 'dog ears'
            },
            {
                local: '狐狸耳朵',
                raw: 'fox ears'
            },
            {
                local: '兔子耳朵',
                raw: 'bunny ears'
            },
            {
                local: '熊耳朵',
                raw: 'bear ears'
            },
            {
                local: '狼耳朵',
                raw: 'wolf ears'
            },
            {
                local: '马耳朵',
                raw: 'horse ears'
            },
            {
                local: '牛耳朵',
                raw: 'cow ears'
            },
            {
                local: '老鼠耳朵',
                raw: 'mouse ears'
            },
            {
                local: '猪耳朵',
                raw: 'pig ears'
            },
            {
                local: '羊耳朵',
                raw: 'sheep ears'
            },
            {
                local: '鹿耳朵',
                raw: 'deer ears'
            },
            {
                local: '山羊耳朵',
                raw: 'goat ears'
            },
            {
                local: '羚羊耳朵',
                raw: 'antelope ears'
            },
            {
                local: '犀牛耳朵',
                raw: 'rhino ears'
            },
            {
                local: '大象耳朵',
                raw: 'elephant ears'
            },
            {
                local: '蝙蝠耳朵',
                raw: 'bat ears'
            },
            {
                local: '龙耳朵',
                raw: 'dragon ears'
            },
            {
                local: '恶魔耳朵',
                raw: 'demon ears'
            },
            {
                local: '天使耳朵',
                raw: 'angel ears'
            },
            {
                local: '外星人耳朵',
                raw: 'alien ears'
            },
            {
                local: '耳朵通红',
                raw: 'ear_blush'
            },
            {
                local: '耳饰',
                raw: 'ear_ornament'
            },
            {
                local: '耳洞',
                raw: 'ear_piercing'
            },
            {
                local: '兽耳',
                raw: 'animal_ears'
            },
            {
                local: '垂耳',
                raw: 'ears_down'
            },
            {
                local: '假兽耳',
                raw: 'fake_animal_ears'
            },
            {
                local: '松软的耳朵',
                raw: 'floppy_ears'
            },
            {
                local: '动物耳朵绒毛',
                raw: 'animal_ear_fluff'
            },
            {
                local: '狐狸耳朵',
                raw: 'fox_ears'
            },
            {
                local: '猫耳朵',
                raw: 'cat_ears'
            },
            {
                local: '狮子耳朵',
                raw: 'lion_ears'
            },
            {
                local: '美洲豹耳朵',
                raw: 'jaguar_ears'
            },
            {
                local: '虎耳',
                raw: 'tiger_ears'
            },
            {
                local: '狗耳朵',
                raw: 'dog_ears'
            },
            {
                local: '郊狼耳朵',
                raw: 'coyote_ears'
            },
            {
                local: '兔耳',
                raw: 'bunny_ears'
            },
            {
                local: '马耳',
                raw: 'horse_ears'
            },
            {
                local: '尖耳朵',
                raw: 'pointy_ears'
            },
            {
                local: '长尖耳朵',
                raw: 'long_pointy_ears'
            },
            {
                local: '老鼠耳朵',
                raw: 'mouse_ears'
            },
            {
                local: '浣熊耳朵',
                raw: 'raccoon_ears'
            },
            {
                local: '松鼠耳朵',
                raw: 'squirrel_ears'
            },
            {
                local: '熊耳朵',
                raw: 'bear_ears'
            },
            {
                local: '熊猫耳朵',
                raw: 'panda_ears'
            },
            {
                local: '蝙蝠耳朵',
                raw: 'bat_ears'
            },
            {
                local: '机器人耳朵',
                raw: 'robot_ears'
            },
            {
                local: '额外的耳朵',
                raw: 'extra_ears'
            },
            {
                local: '耳朵穿过帽子或头饰',
                raw: 'ears_through_headwear'
            },
            {
                local: '羊驼耳',
                raw: 'alpaca_ears'
            },
            {
                local: '兽角',
                raw: 'horns'
            },
            {
                local: '假角',
                raw: 'fake_horns'
            },
            {
                local: '龙角',
                raw: 'dragon_horns'
            },
            {
                local: '鬼角',
                raw: 'oni_horns'
            },
            {
                local: '鹿角',
                raw: 'antlers'
            },
            {
                local: '弯角',
                raw: 'curled_horns'
            },
            {
                local: '山羊角',
                raw: 'goat_horns'
            },
            {
                local: '角上的头发',
                raw: 'hair_on_horn'
            }
        ],
        眉毛: [
            {
                local: '浓眉',
                raw: 'thick eyebrows'
            },
            {
                local: '眉毛翘起',
                raw: 'cocked eyebrow'
            },
            {
                local: '短眉毛',
                raw: 'short eyebrows'
            },
            {
                local: 'V字眉',
                raw: 'v-shaped eyebrows'
            }
        ],
        眼睛: [
            {
                local: '蓝色眼睛',
                raw: 'blue eyes'
            },
            {
                local: '红色眼睛',
                raw: 'red eyes'
            },
            {
                local: '棕色眼睛',
                raw: 'brown eyes'
            },
            {
                local: '绿色眼睛',
                raw: 'green eyes'
            },
            {
                local: '紫色眼睛',
                raw: 'purple eyes'
            },
            {
                local: '黄色眼睛',
                raw: 'yellow eyes'
            },
            {
                local: '粉色眼睛',
                raw: 'pink eyes'
            },
            {
                local: '黑色眼睛',
                raw: 'black eyes'
            },
            {
                local: '水蓝色眼睛',
                raw: 'aqua eyes'
            },
            {
                local: '橙色眼睛',
                raw: 'orange eyes'
            },
            {
                local: '灰色眼睛',
                raw: 'grey eyes'
            },
            {
                local: '多彩眼睛',
                raw: 'multicolored eyes'
            },
            {
                local: '白色眼睛',
                raw: 'white eyes'
            },
            {
                local: '渐变眼睛',
                raw: 'gradient eyes'
            },
            {
                local: '闭上眼睛',
                raw: 'closed eyes'
            },
            {
                local: '半闭眼',
                raw: 'half-closed eyes'
            },
            {
                local: '睁着眼睛哭',
                raw: 'crying with eyes open'
            },
            {
                local: '眯起眼睛',
                raw: 'narrowed eyes'
            },
            {
                local: '隐藏眼睛',
                raw: 'hidden eyes'
            },
            {
                local: '心形眼睛',
                raw: 'heart-shaped eyes'
            },
            {
                local: '纽扣眼睛',
                raw: 'button eyes'
            },
            {
                local: '头足类眼睛',
                raw: 'cephalopod eyes'
            },
            {
                local: '透过头发看见眼睛',
                raw: 'eyes visible through hair'
            },
            {
                local: '发光的眼睛',
                raw: 'glowing eyes'
            },
            {
                local: '空洞的眼睛',
                raw: 'empty eyes'
            },
            {
                local: '翻白眼',
                raw: 'rolling eyes'
            },
            {
                local: '斗鸡眼',
                raw: 'cross eyed'
            },
            {
                local: '空白的眼睛',
                raw: 'blank eyes'
            },
            {
                local: '没有眼睛',
                raw: 'no eyes'
            },
            {
                local: '闪闪发光的眼睛',
                raw: 'sparkling eyes'
            },
            {
                local: '额外的眼睛',
                raw: 'extra eyes'
            },
            {
                local: '疯狂的眼睛',
                raw: 'crazy eyes'
            },
            {
                local: '实心圆眼',
                raw: 'solid circle eyes'
            },
            {
                local: '实心椭圆形眼睛',
                raw: 'solid oval eyes'
            },
            {
                local: '不均匀的眼睛',
                raw: 'uneven eyes'
            },
            {
                local: '眼里流血',
                raw: 'blood from eyes'
            },
            {
                local: '眼影',
                raw: 'eyeshadow'
            },
            {
                local: '红色眼影',
                raw: 'red eyeshadow'
            },
            {
                local: '蓝色眼影',
                raw: 'blue eyeshadow'
            },
            {
                local: '紫色眼影',
                raw: 'purple eyeshadow'
            },
            {
                local: '粉色眼影',
                raw: 'pink eyeshadow'
            },
            {
                local: '绿色眼影',
                raw: 'green eyeshadow'
            },
            {
                local: '眼袋',
                raw: 'bags under eyes'
            },
            {
                local: '眼圈',
                raw: 'ringed eyes'
            },
            {
                local: '蒙住眼睛',
                raw: 'covered eyes'
            },
            {
                local: '遮住眼睛',
                raw: 'covering eyes'
            },
            {
                local: '挡着眼睛',
                raw: 'shading eyes'
            },
            {
                local: '魔鬼眼',
                raw: 'devil eyes'
            },
            {
                local: '猫眼',
                raw: 'slit pupils'
            },
            {
                local: '充血的眼睛',
                raw: 'bloodshot eyes'
            },
            {
                local: '眼尾上扬',
                raw: 'tsurime'
            },
            {
                local: '眼尾下垂',
                raw: 'tareme'
            },
            {
                local: '瞳孔收缩',
                raw: 'constricted pupils'
            },
            {
                local: '魔瞳',
                raw: 'devil pupils'
            },
            {
                local: '蛇瞳',
                raw: 'snake pupils'
            },
            {
                local: '瞳孔闪烁',
                raw: 'pupils sparkling'
            },
            {
                local: '花状瞳孔',
                raw: 'flower-shaped pupils'
            },
            {
                local: '心形瞳孔',
                raw: 'heart-shaped pupils'
            },
            {
                local: '异色瞳',
                raw: 'heterochromia'
            },
            {
                local: '美瞳',
                raw: 'color contact lenses'
            },
            {
                local: '长睫毛',
                raw: 'longeyelashes'
            },
            {
                local: '彩色睫毛',
                raw: 'colored eyelashes'
            },
            {
                local: '眼下痣',
                raw: 'mole under eye'
            },
            {
                local: '明亮的眼睛',
                raw: 'light_eyes'
            },
            {
                local: '发光的眼睛',
                raw: 'glowing_eye'
            },
            {
                local: '闪亮的眼睛',
                raw: 'shiny_eyes'
            },
            {
                local: '星星眼',
                raw: 'sparkling_eyes'
            },
            {
                local: '渐变眼睛',
                raw: 'gradient_eyes'
            },
            {
                local: '动画眼',
                raw: 'anime_style_eyes'
            },
            {
                local: '水汪汪',
                raw: 'water_eyes'
            },
            {
                local: '美丽的眼睛',
                raw: 'beautiful_detailed_eyes'
            },
            {
                local: 'Q版实心椭圆眼睛',
                raw: 'solid_oval_eyes_'
            },
            {
                local: 'Q版实心圆瞳孔',
                raw: 'solid_circle_pupils'
            },
            {
                local: 'Q版腮红贴纸',
                raw: 'blush_stickers'
            },
            {
                local: '心形眼',
                raw: 'heart_in_eye'
            },
            {
                local: '邪恶的眼睛',
                raw: 'evil_eyes'
            },
            {
                local: '疯狂的眼睛',
                raw: 'crazy_eyes'
            },
            {
                local: '失去高光的眼睛',
                raw: 'empty_eyes'
            },
            {
                local: '蒙住的眼睛',
                raw: 'covered_eyes'
            },
            {
                local: 'star-shaped_pupils',
                raw: 'hollow_eyes'
            },
            {
                local: '多彩多姿的眼睛',
                raw: 'multicolored_eyes'
            },
            {
                local: '眼圈',
                raw: 'ringed_eyes'
            },
            {
                local: '三白症(瞳孔偏移)',
                raw: 'sanpaku'
            },
            {
                local: '错配巩膜',
                raw: 'mismatched_sclera'
            },
            {
                local: '眼睛反射(没有效果',
                raw: 'eye_relfection'
            },
            {
                local: '机械眼',
                raw: 'mechanical_eye'
            },
            {
                local: '头足类眼睛',
                raw: 'cephalopod_eyes'
            },
            {
                local: '钟眼',
                raw: 'clock_eyes'
            },
            {
                local: '复眼',
                raw: 'compound_eyes'
            },
            {
                local: '鱼眼',
                raw: 'fisheye'
            },
            {
                local: '恶魔之眼',
                raw: 'devil_eyes'
            },
            {
                local: '布满血丝的眼睛',
                raw: 'bloodshot_eyes'
            },
            {
                local: '血从眼里流出',
                raw: 'blood_from_eyes'
            },
            {
                local: '青色眼睛',
                raw: 'aqua_eyes'
            },
            {
                local: '坚定的眼睛',
                raw: 'solid_eyes'
            },
            {
                local: '闪光动画眼',
                raw: 'sparkling_anime_eyes'
            },
            {
                local: '蓝眼睛',
                raw: 'blue_eyes'
            },
            {
                local: '棕色的眼睛',
                raw: 'brown_eyes'
            },
            {
                local: '闭上的眼睛',
                raw: 'closed_eyes'
            },
            {
                local: '睁着眼落泪',
                raw: 'crying_with_eyes_open'
            },
            {
                local: '多只眼睛',
                raw: 'extra_eyes'
            },
            {
                local: '眼神交流',
                raw: 'eye_contact'
            },
            {
                local: '荷鲁斯之眼',
                raw: 'eye_of_horus'
            },
            {
                local: '眼球',
                raw: 'eyeball'
            },
            {
                local: '眼线',
                raw: 'eyeliner'
            },
            {
                local: '眼睛',
                raw: 'eyes'
            },
            {
                local: '眼中闪现强烈的情感',
                raw: 'glint'
            },
            {
                local: '发光的双眼',
                raw: 'glowing_eyes'
            },
            {
                local: '半闭的眼睛(单眼)',
                raw: 'half-closed_eye'
            },
            {
                local: '半闭的双眼',
                raw: 'half-closed_eyes'
            },
            {
                local: null,
                raw: 'horizontal_pupils'
            },
            {
                local: '轻蔑的眼神',
                raw: 'jitome'
            },
            {
                local: '浅棕色眼睛',
                raw: 'light_brown_eyes'
            },
            {
                local: '没画出眼睛',
                raw: 'no_eyes'
            },
            {
                local: '反光的眼睛',
                raw: 'one-eyed'
            },
            {
                local: null,
                raw: 'reflective_eyes'
            },
            {
                local: '银色的眼睛',
                raw: 'silver_eyes'
            },
            {
                local: '漩涡眼',
                raw: 'spiral_eyes'
            },
            {
                local: '第三只眼',
                raw: 'third_eye'
            },
            {
                local: '大小眼',
                raw: 'uneven_eyes'
            },
            {
                local: '焰目',
                raw: 'flaming_eye'
            },
            {
                local: '闭眼',
                raw: 'eyes_closed'
            },
            {
                local: '半闭双眼',
                raw: 'half_closed_eyes'
            },
            {
                local: '眯起眼睛',
                raw: 'narrowed_eyes'
            },
            {
                local: '眯起眼睛看',
                raw: 'squinting'
            },
            {
                local: '眼泪',
                raw: 'tears'
            },
            {
                local: '锐利的眼',
                raw: 'sharp_eyes'
            },
            {
                local: '锐利的眼',
                raw: 'slanted_eyes'
            },
            {
                local: '上翘的眼睛',
                raw: 'upturned_eyes'
            },
            {
                local: '斗鸡眼',
                raw: 'cross-eyed'
            },
            {
                local: '头发遮着双眼',
                raw: 'hair_over_eyes'
            },
            {
                local: '透过头发可以看到的眼睛',
                raw: 'eyes_visible_through_hair'
            },
            {
                local: '头发遮住了一只眼睛',
                raw: 'hair_over_one_eye'
            },
            {
                local: '一只眼被遮住',
                raw: 'one_eye_covered'
            },
            {
                local: '眼袋',
                raw: 'bags_under_eyes'
            },
            {
                local: '眼罩',
                raw: 'eyepatch'
            },
            {
                local: '医用眼罩',
                raw: 'medical_eyepatch'
            },
            {
                local: '眼睛上的疤痕',
                raw: 'scar_across_eye'
            },
            {
                local: '去掉了(原设有的)蒙眼要素',
                raw: 'no_blindfold'
            },
            {
                local: '去掉了(原设有的)眼罩',
                raw: 'no_eyepatch'
            },
            {
                local: '阿嘿颜',
                raw: 'ahegao'
            }
        ],
        瞳孔: [
            {
                local: '瞳孔',
                raw: 'pupils'
            },
            {
                local: '明亮的瞳孔',
                raw: 'bright_pupils'
            },
            {
                local: '异色瞳',
                raw: 'heterochromia'
            },
            {
                local: '竖的瞳孔/猫眼',
                raw: 'slit_pupils'
            },
            {
                local: '瞳孔闪光',
                raw: 'snake_pupils'
            },
            {
                local: '符号形瞳孔',
                raw: 'symbol-shaped_pupils'
            },
            {
                local: '爱心形瞳孔',
                raw: 'heart-shaped_pupils'
            },
            {
                local: '钻石形状瞳孔',
                raw: 'diamond-shaped_pupils'
            },
            {
                local: '五角星形状瞳孔',
                raw: 'star-shaped_pupils'
            },
            {
                local: '瞳孔散大',
                raw: 'dilated_pupils'
            },
            {
                local: '没有瞳孔',
                raw: 'no_pupils'
            },
            {
                local: '轮回眼',
                raw: 'ringed_eyes'
            },
            {
                local: '收缩的瞳孔(没有效果',
                raw: 'constricted_pupils'
            },
            {
                local: '眼睛里的星星',
                raw: 'star_in_eye'
            },
            {
                local: 'X形瞳孔',
                raw: 'x-shaped_pupils'
            },
            {
                local: '水平瞳孔',
                raw: 'horizontal_pupils'
            },
            {
                local: '虚线的眼睛',
                raw: 'dashed_eyes'
            },
            {
                local: '蝴蝶形瞳孔',
                raw: 'butterfly-shaped_pupils'
            },
            {
                local: '长方形瞳孔',
                raw: 'rectangular_pupils'
            },
            {
                local: '方形瞳孔',
                raw: 'square_pupils'
            },
            {
                local: '点瞳孔',
                raw: 'dot_pupils'
            },
            {
                local: '额外的瞳孔',
                raw: 'extra_pupils'
            },
            {
                local: '不匹配的瞳孔',
                raw: 'mismatched_pupils'
            },
            {
                local: '十字星星眼',
                raw: '+_+'
            },
            {
                local: '符号形瞳孔(没有效果',
                raw: 'cross-shaped_pupils'
            },
            {
                local: '紫色瞳孔',
                raw: 'purple_pupils'
            },
            {
                local: '橙色瞳孔',
                raw: 'orange_pupils'
            },
            {
                local: '橙色瞳孔',
                raw: 'blue_pupils'
            },
            {
                local: '眼睛里有符号',
                raw: 'symbol_in_eye'
            }
        ],
        鼻子: [
            {
                local: '尖鼻子',
                raw: 'pointed nose'
            },
            {
                local: '小鼻子',
                raw: 'small nose'
            },
            {
                local: '大鼻子',
                raw: 'big nose'
            },
            {
                local: '没鼻子的',
                raw: 'no_nose'
            },
            {
                local: '点状鼻',
                raw: 'dot_nose'
            },
            {
                local: '鼻泡',
                raw: 'nose_bubble'
            },
            {
                local: '闻',
                raw: 'smelling'
            },
            {
                local: '鼻子',
                raw: 'nose'
            },
            {
                local: '流鼻血',
                raw: 'nosebleed'
            },
            {
                local: '鼻涕',
                raw: 'snot'
            },
            {
                local: '动物口鼻部',
                raw: 'snout'
            }
        ],
        嘴巴: [
            {
                local: '栗子嘴',
                raw: 'chestnut mouth'
            },
            {
                local: '厚嘴唇',
                raw: 'thick lips'
            },
            {
                local: '肿嘴唇',
                raw: 'puffy lips'
            },
            {
                local: '口红',
                raw: 'lipstick'
            },
            {
                local: '心形嘴',
                raw: 'heart-shaped mouth'
            },
            {
                local: '嘟嘴',
                raw: 'pout'
            },
            {
                local: '张嘴',
                raw: 'open mouth'
            },
            {
                local: '闭嘴',
                raw: 'closed mouth'
            },
            {
                local: '鲨鱼嘴',
                raw: 'shark mouth'
            },
            {
                local: '张开的嘴',
                raw: 'parted lips'
            },
            {
                local: '嘴下痣',
                raw: 'mole under mouth'
            },
            {
                local: '张嘴',
                raw: 'open_mouth'
            },
            {
                local: '喘气（张大嘴）',
                raw: 'gasping'
            },
            {
                local: '嘴巴微微张开',
                raw: 'Slightly_open_mouth'
            },
            {
                local: '波浪嘴',
                raw: 'wavy_mouth'
            },
            {
                local: '闭嘴',
                raw: 'close_mouth'
            },
            {
                local: '点嘴',
                raw: 'dot_mouth'
            },
            {
                local: '没有嘴',
                raw: 'no_mouth'
            },
            {
                local: '堵嘴',
                raw: 'gag'
            },
            {
                local: '啃',
                raw: 'gnaw'
            },
            {
                local: '猫嘴',
                raw: ':3'
            },
            {
                local: '张嘴',
                raw: ':o'
            },
            {
                local: 'V嘴',
                raw: ':>'
            },
            {
                local: '嘴唇张开',
                raw: 'parted_lips'
            },
            {
                local: '勒住嘴',
                raw: 'bit_gag'
            },
            {
                local: '栗子嘴',
                raw: 'chestnut_mouth'
            },
            {
                local: '被封住嘴',
                raw: 'cleave_gag'
            },
            {
                local: '闭着的嘴',
                raw: 'closed_mouth'
            },
            {
                local: '蒙住的嘴',
                raw: 'covered_mouth'
            },
            {
                local: '有多张嘴巴',
                raw: 'extra_mouth'
            },
            {
                local: '嘴里有头发',
                raw: 'hair_in_mouth'
            },
            {
                local: '将系头发的东西叼在嘴里',
                raw: 'hair_tie_in_mouth'
            },
            {
                local: '嘟嘴|抿嘴',
                raw: 'homu'
            },
            {
                local: '嘴唇',
                raw: 'lips'
            },
            {
                local: '嘴',
                raw: 'mouth'
            },
            {
                local: '用嘴叼着',
                raw: 'mouth_hold'
            },
            {
                local: '用嘴',
                raw: 'oral'
            },
            {
                local: '奶嘴',
                raw: 'pacifier'
            },
            {
                local: '撅起的嘴唇',
                raw: 'Pouted lips'
            },
            {
                local: '把嘴画在侧脸',
                raw: 'sideways_mouth'
            },
            {
                local: '嘴里含着勺子',
                raw: 'spoon_in_mouth'
            },
            {
                local: '三角嘴',
                raw: 'triangle_mouth'
            },
            {
                local: '唾液',
                raw: 'saliva'
            },
            {
                local: '流口水',
                raw: 'drooling'
            },
            {
                local: '嘴角画着口水滴形状的缺口',
                raw: 'mouth_drool'
            }
        ],
        牙齿: [
            {
                local: '牙齿',
                raw: 'teeth'
            },
            {
                local: '上牙',
                raw: 'upper_teeth'
            },
            {
                local: '虎牙',
                raw: 'fang'
            },
            {
                local: '肤色虎牙',
                raw: 'skin_fang'
            },
            {
                local: '圆齿',
                raw: 'round_teeth'
            },
            {
                local: '锋利的牙齿',
                raw: 'sharp_teeth'
            },
            {
                local: '咬紧牙关',
                raw: 'clenched_teeth'
            },
            {
                local: '舌头',
                raw: 'tongue'
            },
            {
                local: '龅牙',
                raw: 'buck_teeth'
            },
            {
                local: '露出虎牙|露出尖牙',
                raw: 'fang_out'
            },
            {
                local: '尖牙',
                raw: 'fangs'
            },
            {
                local: '狼牙棒',
                raw: 'spiked_club'
            },
            {
                local: '牙',
                raw: 'tooth'
            },
            {
                local: '牙刷',
                raw: 'toothbrush'
            },
            {
                local: '象牙',
                raw: 'tusks'
            },
            {
                local: '鲨鱼牙',
                raw: 'shark_mouth'
            }
        ],
        舌头: [
            {
                local: '舌头放在上唇',
                raw: ':q'
            },
            {
                local: '舌头放在下唇',
                raw: ':p'
            },
            {
                local: '眨眼舌头上伸',
                raw: ';p'
            },
            {
                local: '舌吻|法式湿吻',
                raw: 'french_kiss'
            },
            {
                local: '长舌头',
                raw: 'long_tongue'
            },
            {
                local: '迎接射精而伸出舌头',
                raw: 'oral_invitation'
            },
            {
                local: '舌头',
                raw: 'tongue'
            },
            {
                local: '吐舌头',
                raw: 'tongue_out'
            },
            {
                local: '小舌头|口盖垂|悬雍垂',
                raw: 'uvula'
            }
        ],
        指甲: [
            {
                local: '手指甲',
                raw: 'fingernails'
            },
            {
                local: '脚趾甲',
                raw: 'toenails'
            },
            {
                local: '指甲油',
                raw: 'nail_polish'
            },
            {
                local: '脚趾甲油',
                raw: 'toenail_polish'
            },
            {
                local: '黑指甲',
                raw: 'black_nails'
            },
            {
                local: '红指甲',
                raw: 'red_nails'
            },
            {
                local: '粉色指甲',
                raw: 'pink_nails'
            },
            {
                local: '长指甲',
                raw: 'long_fingernails'
            },
            {
                local: '钉子|指甲',
                raw: 'nail'
            },
            {
                local: '多彩指甲',
                raw: 'multicolored_nails'
            },
            {
                local: '美甲',
                raw: 'nail_art'
            },
            {
                local: '棕色马甲',
                raw: 'brown_vest'
            }
        ],
        肩部: [
            {
                local: '赤肩',
                raw: 'bare shoulders'
            },
            {
                local: '锁骨',
                raw: 'collarbonea'
            },
            {
                local: '腋下',
                raw: 'armpits'
            },
            {
                local: '腋窝皱痕',
                raw: 'armpit_crease'
            }
        ],
        胸部: [
            {
                local: '胸部',
                raw: 'chest'
            },
            {
                local: '贫乳(A_)',
                raw: 'flat chest'
            },
            {
                local: '小胸部(B)',
                raw: 'small_breasts'
            },
            {
                local: '中等胸部(C)',
                raw: 'medium breasts'
            },
            {
                local: '大胸部(D)',
                raw: 'big breasts'
            },
            {
                local: '巨乳(E)',
                raw: 'huge breasts'
            },
            {
                local: '超巨乳(F)',
                raw: 'gigantic breasts'
            },
            {
                local: '两胸之间',
                raw: 'between breasts'
            },
            {
                local: '胸部分开',
                raw: 'breasts apart'
            },
            {
                local: '下垂',
                raw: 'hanging breasts'
            },
            {
                local: '晃动',
                raw: 'bouncing breasts'
            },
            {
                local: '乳沟',
                raw: 'cleavage'
            },
            {
                local: '乳晕',
                raw: 'areola'
            },
            {
                local: '乳头',
                raw: 'nipples'
            },
            {
                local: '胸肌',
                raw: 'pectorals'
            },
            {
                local: '大胸肌',
                raw: 'large_pectorals'
            },
            {
                local: '半露前胸',
                raw: 'unbuttoned clothes'
            }
        ],
        腰部: [
            {
                local: '细腰',
                raw: 'narrow_waist'
            },
            {
                local: '纤细的腰',
                raw: 'slender_waist'
            }
        ],
        腹部: [
            {
                local: '腹部',
                raw: 'midriff'
            },
            {
                local: '肚子',
                raw: 'belly'
            },
            {
                local: '腹肌',
                raw: 'absolute_territory'
            },
            {
                local: '隆起的腹部',
                raw: 'inflation'
            },
            {
                local: '肚脐',
                raw: 'navel'
            },
            {
                local: '腹股沟',
                raw: 'groin'
            },
            {
                local: '怀孕',
                raw: 'pregnant'
            }
        ],
        翅膀: [
            {
                local: '翅膀',
                raw: 'wings'
            },
            {
                local: '蝙蝠翅膀',
                raw: 'bat_wings'
            },
            {
                local: '蝴蝶翅膀',
                raw: 'butterfly_wings'
            },
            {
                local: '黑色之翼',
                raw: 'black_wings'
            },
            {
                local: '恶魔之翼',
                raw: 'demon_wings'
            },
            {
                local: '不对称的翅膀',
                raw: 'asymmetrical_wings'
            },
            {
                local: '不与本体相连的翅膀',
                raw: 'detached_wings'
            },
            {
                local: '妖精的翅膀',
                raw: 'fairy_wings'
            },
            {
                local: '仿造的翅膀',
                raw: 'fake_wings'
            },
            {
                local: '燃烧着的翅膀',
                raw: 'fiery_wings'
            },
            {
                local: '昆虫翅膀',
                raw: 'insect_wings'
            },
            {
                local: '大翅膀',
                raw: 'large_wings'
            },
            {
                local: '腰间的翅膀',
                raw: 'low_wings'
            },
            {
                local: '迷你翅膀',
                raw: 'mini_wings'
            },
            {
                local: '有多种颜色的翅膀',
                raw: 'multicolored_wings'
            },
            {
                local: '多对翅膀',
                raw: 'multiple_wings'
            },
            {
                local: '去掉了(原设有的)翅膀',
                raw: 'no_wings'
            },
            {
                local: '带翅膀的头盔',
                raw: 'winged_helmet'
            }
        ]
    },
    服饰: {
        正装: [
            {
                local: '西装',
                raw: 'suit'
            },
            {
                local: '燕尾服',
                raw: 'tuxedo'
            },
            {
                local: '礼服',
                raw: 'formal_dress'
            },
            {
                local: '礼服',
                raw: 'evening_gown'
            },
            {
                local: '晚会礼服',
                raw: 'canonicals'
            },
            {
                local: '鸡尾酒连衣裙',
                raw: 'cocktail_dress'
            },
            {
                local: '女长服',
                raw: 'gown'
            },
            {
                local: '和服',
                raw: 'japanese_clothes'
            },
            {
                local: '和服',
                raw: 'kimono'
            },
            {
                local: '无袖和服',
                raw: 'sleeveless_kimono'
            },
            {
                local: '短和服',
                raw: 'short_kimono'
            },
            {
                local: '印花和服',
                raw: 'print_kimono'
            },
            {
                local: '振袖(和服的一部份)',
                raw: 'furisode'
            },
            {
                local: '衣带(和服用)',
                raw: 'obi'
            },
            {
                local: '饰带',
                raw: 'sash'
            },
            {
                local: '旗袍',
                raw: 'cheongsam'
            },
            {
                local: '旗袍',
                raw: 'china_dress'
            },
            {
                local: '印花旗袍',
                raw: 'print_cheongsam'
            },
            {
                local: '旗袍类衣物的前摆',
                raw: 'pelvic_curtain'
            },
            {
                local: '婚纱',
                raw: 'wedding_dress'
            },
            {
                local: '白无垢(日式嫁衣)',
                raw: 'uchikake'
            },
            {
                local: '校服',
                raw: 'school_uniform'
            },
            {
                local: '水手服',
                raw: 'sailor'
            },
            {
                local: '水手服',
                raw: 'serafuku'
            },
            {
                local: '夏季制服',
                raw: 'summer_uniform'
            },
            {
                local: '幼儿园制服',
                raw: 'kindergarten_uniform'
            },
            {
                local: '警服',
                raw: 'police_uniform'
            },
            {
                local: '海军制服',
                raw: 'naval_uniform'
            },
            {
                local: '陆军制服',
                raw: 'military_uniform'
            },
            {
                local: '纳粹制服',
                raw: 'ss_uniform/nazi_uniform'
            },
            {
                local: '女仆装',
                raw: 'maid'
            },
            {
                local: '女侍从的制服',
                raw: 'stile_uniform'
            },
            {
                local: '巫女服',
                raw: 'miko'
            },
            {
                local: '工作服',
                raw: 'overalls'
            },
            {
                local: '职场制服',
                raw: 'business_suit'
            },
            {
                local: '护士',
                raw: 'nurse'
            },
            {
                local: '厨师工装',
                raw: 'chef_uniform'
            },
            {
                local: '白大褂',
                raw: 'labcoat'
            },
            {
                local: '啦啦队服',
                raw: 'cheerleader'
            },
            {
                local: '乐队制服',
                raw: 'band_uniform'
            },
            {
                local: '宇航服',
                raw: 'space_suit'
            },
            {
                local: '连衣裤',
                raw: 'leotard'
            },
            {
                local: '修女服',
                raw: 'domineering'
            }
        ],
        风格: [
            {
                local: '中国服饰',
                raw: 'china_dress'
            },
            {
                local: '中国风',
                raw: 'chinese_style'
            },
            {
                local: '传统服装|民族服装',
                raw: 'traditional_clothes'
            },
            {
                local: '日式服装',
                raw: 'japanese_clothes'
            },
            {
                local: '袢缠(日式',
                raw: 'hanten_(clothes)'
            },
            {
                local: '韩服',
                raw: 'hanbok'
            },
            {
                local: '朝鲜服饰',
                raw: 'korean_clothes'
            },
            {
                local: '西部风格',
                raw: 'western'
            },
            {
                local: '德国服装',
                raw: 'german_clothes'
            },
            {
                local: '哥特风格',
                raw: 'gothic'
            },
            {
                local: '洛丽塔风格',
                raw: 'lolita'
            },
            {
                local: '哥特洛丽塔风格',
                raw: 'gothic_lolita'
            },
            {
                local: '拜占庭风格',
                raw: 'byzantine_fashion'
            },
            {
                local: '热带特征的',
                raw: 'Tropical'
            },
            {
                local: '印度风格',
                raw: 'indian_style'
            },
            {
                local: '越南校服（奥黛）',
                raw: 'Ao_Dai'
            },
            {
                local: '阿伊努人的服饰',
                raw: 'ainu_clothes'
            },
            {
                local: '阿拉伯服饰',
                raw: 'arabian_clothes'
            },
            {
                local: '埃及风格服饰',
                raw: 'egyptian_clothes'
            },
            {
                local: '套装',
                raw: 'costume'
            },
            {
                local: '动物系套装(皮套)',
                raw: 'animal_costume'
            },
            {
                local: '兔子服装',
                raw: 'bunny_costume'
            },
            {
                local: '原设服装改编',
                raw: 'adapted_costume'
            },
            {
                local: '猫系服装',
                raw: 'cat_costume'
            },
            {
                local: '皮套狗',
                raw: 'dog_costume'
            },
            {
                local: '熊套装',
                raw: 'bear_costume'
            },
            {
                local: '经润饰的服装',
                raw: 'embellished_costume'
            },
            {
                local: '圣诞风格服装',
                raw: 'santa_costume'
            },
            {
                local: '万圣节服装',
                raw: 'halloween_costume'
            },
            {
                local: '香霖堂天狗装束',
                raw: 'kourindou_tengu_costume'
            },
            {
                local: '与原设不同衣服',
                raw: 'alternate_costume'
            },
            {
                local: '换衣play',
                raw: 'costume_switch'
            },
            {
                local: '模因服装',
                raw: 'meme_attire'
            }
        ],
        休闲装: [
            {
                local: '休闲',
                raw: 'casual'
            },
            {
                local: '休闲服',
                raw: 'loungewear'
            },
            {
                local: '卫衣',
                raw: 'hoodie'
            },
            {
                local: '居家服',
                raw: 'homewear'
            },
            {
                local: '睡衣',
                raw: 'pajamas'
            },
            {
                local: '睡衣',
                raw: 'nightgown'
            },
            {
                local: '睡衣',
                raw: 'sleepwear'
            },
            {
                local: '情趣睡衣',
                raw: 'babydoll'
            },
            {
                local: '印花睡衣',
                raw: 'print_pajamas'
            },
            {
                local: '波点睡衣',
                raw: 'polka_dot_pajamas'
            },
            {
                local: '浴衣',
                raw: 'yukata'
            },
            {
                local: '唐装',
                raw: 'chinese_clothes'
            },
            {
                local: '汉服',
                raw: 'hanfu'
            },
            {
                local: '道袍',
                raw: 'Taoist robe'
            },
            {
                local: '长袍',
                raw: 'robe'
            },
            {
                local: '混合长袍',
                raw: 'robe_of_blending'
            },
            {
                local: '斗篷',
                raw: 'cloak'
            },
            {
                local: '连帽斗篷',
                raw: 'hooded_cloak'
            },
            {
                local: '冬装',
                raw: 'winter_clothes'
            },
            {
                local: '羽绒服',
                raw: 'down jacket'
            },
            {
                local: '圣诞装',
                raw: 'santa'
            },
            {
                local: '舞娘服',
                raw: 'harem_outfit'
            },
            {
                local: '耸肩（服装）',
                raw: 'shrug_(clothing)'
            }
        ],
        运动服: [
            {
                local: '运动服',
                raw: 'sportswear'
            },
            {
                local: '运动服',
                raw: 'gym_uniform'
            },
            {
                local: '体操服',
                raw: 'athletic_leotard'
            },
            {
                local: '网球衫',
                raw: 'tennis_uniform'
            },
            {
                local: '棒球服',
                raw: 'baseball_uniform'
            },
            {
                local: '棒球夹克',
                raw: 'letterman_jacket'
            },
            {
                local: '排球服',
                raw: 'volleyball_uniform'
            },
            {
                local: '自行车运动服',
                raw: 'biker_clothes'
            },
            {
                local: '骑行套装',
                raw: 'bikesuit'
            },
            {
                local: '摔角服',
                raw: 'wrestling_outfit'
            },
            {
                local: '武道服',
                raw: 'dougi'
            }
        ],
        泳装: [
            {
                local: '泳装',
                raw: 'swimsuit'
            },
            {
                local: '泳衣',
                raw: 'swimwear'
            },
            {
                local: '湿泳衣',
                raw: 'wet_swimsuit'
            },
            {
                local: '学校泳装（死库水）',
                raw: 'school_swimsuit'
            },
            {
                local: '新式死库水',
                raw: 'new_school_swimsuit'
            },
            {
                local: '旧式死库水',
                raw: 'old_school_swimsuit'
            },
            {
                local: '竞泳死库水',
                raw: 'competition_school_swimsuit'
            },
            {
                local: '赛用泳衣',
                raw: 'competition_swimsuit'
            },
            {
                local: '连体泳衣',
                raw: 'casual_one-piece_swimsuit'
            },
            {
                local: '拉链在正面的泳衣',
                raw: 'front_zipper_swimsuit'
            },
            {
                local: '高开衩的泳衣',
                raw: 'highleg_swimsuit'
            },
            {
                local: '一体式泳衣',
                raw: 'one-piece_swimsuit'
            },
            {
                local: '常夏的泳衣(fgo学妹灵衣)',
                raw: 'swimsuit_of_perpetual_summer'
            },
            {
                local: '比基尼',
                raw: 'bikini'
            },
            {
                local: '高腰比基尼',
                raw: 'highleg_bikini'
            },
            {
                local: '低腰比基尼',
                raw: 'lowleg_bikini'
            },
            {
                local: 'V字泳衣',
                raw: 'slingshot_swimsuit'
            },
            {
                local: '水手服款比基尼',
                raw: 'sailor_bikini'
            },
            {
                local: '贝壳比基尼',
                raw: 'shell_bikini'
            },
            {
                local: '运动比基尼',
                raw: 'sports_bikini'
            },
            {
                local: '系绳比基尼',
                raw: 'string_bikini'
            },
            {
                local: '无肩带比基尼',
                raw: 'strapless_bikini'
            },
            {
                local: '细带款比基尼',
                raw: 'side-tie_bikini'
            },
            {
                local: '前系带比基尼上衣',
                raw: 'front-tie_bikini_top'
            },
            {
                local: '多绑带比基尼',
                raw: 'multi-strapped_bikini'
            },
            {
                local: '丁字裤比基尼',
                raw: 'thong_bikini'
            },
            {
                local: '从正面打结的比基尼',
                raw: 'front-tie_bikini'
            },
            {
                local: '花边比基尼',
                raw: 'frilled_bikini'
            },
            {
                local: '带O型环的比基尼',
                raw: 'o-ring_bikini'
            },
            {
                local: '眼罩比基尼',
                raw: 'eyepatch_bikini'
            },
            {
                local: '分层比基尼',
                raw: 'layered_bikini'
            },
            {
                local: '带蝴蝶结的比基尼',
                raw: 'bow_bikini'
            },
            {
                local: '花边泳衣',
                raw: 'frilled_swimsuit'
            },
            {
                local: '圆斑泳衣',
                raw: 'polka_dot_swimsuit'
            },
            {
                local: '条纹泳衣',
                raw: 'striped_swimsuit'
            },
            {
                local: '条纹比基尼',
                raw: 'striped_bikini'
            },
            {
                local: '格子比基尼',
                raw: 'plaid_bikini'
            },
            {
                local: '圆斑比基尼',
                raw: 'polka_dot_bikini'
            },
            {
                local: '印花比基尼',
                raw: 'print_bikini'
            },
            {
                local: '美国国旗比基尼',
                raw: 'american_flag_bikini'
            },
            {
                local: '德国国旗比基尼',
                raw: 'german_flag_bikini'
            },
            {
                local: '人体彩绘般的泳衣',
                raw: 'impossible_swimsuit'
            },
            {
                local: '只穿着比基尼上衣',
                raw: 'bikini_top'
            },
            {
                local: '仅比基尼上衣',
                raw: 'bikini_top_only'
            },
            {
                local: '脱下了比基尼上衣',
                raw: 'bikini_top_removed'
            },
            {
                local: '仅比基尼下装',
                raw: 'bikini_bottom_only'
            },
            {
                local: '比基尼泳裤',
                raw: 'bikini_bottom'
            },
            {
                local: '解开的比基尼',
                raw: 'untied_bikini'
            },
            {
                local: '从三点剥开的比基尼',
                raw: 'bikini_aside'
            },
            {
                local: '把泳衣的裆部挪到一边',
                raw: 'swimsuit_aside'
            },
            {
                local: '衣服里面穿着泳衣',
                raw: 'swimsuit_under_clothes'
            },
            {
                local: '破损的泳衣',
                raw: 'torn_swimsuit'
            },
            {
                local: '比基尼裙',
                raw: 'bikini_skirt'
            },
            {
                local: '泳裤',
                raw: 'swim_briefs'
            },
            {
                local: '泳帽',
                raw: 'swim_cap'
            },
            {
                local: '泳裤',
                raw: 'swim_trunks'
            },
            {
                local: '男用泳裤',
                raw: 'male_swimwear'
            }
        ],
        制服: [
            {
                local: '改装制服',
                raw: 'adapted_uniform'
            },
            {
                local: '安齐奥军服',
                raw: 'anzio_military_uniform'
            },
            {
                local: '安齐奥校服',
                raw: 'anzio_school_uniform'
            },
            {
                local: '亚利亚公司制服',
                raw: 'aria_company_uniform'
            },
            {
                local: '阿什福特学院制服',
                raw: 'ashford_academy_uniform'
            },
            {
                local: 'BC自由学园制服',
                raw: 'bc_freedom_military_uniform'
            },
            {
                local: '迦勒底制服',
                raw: 'chaldea_uniform'
            },
            {
                local: '知波单学院制服',
                raw: 'chi-hatan_military_uniform'
            },
            {
                local: '点兔女仆装',
                raw: 'fleur_de_lapin_uniform'
            },
            {
                local: '加尔格·马可大修道院制服',
                raw: 'garreg_mach_monastery_uniform'
            },
            {
                local: '宝石之国的制服',
                raw: 'gem_uniform_(houseki_no_kuni)'
            },
            {
                local: '花咲川女子学园',
                raw: 'hanasakigawa_school_uniform'
            },
            {
                local: '私立光坂高等学校校服',
                raw: 'hikarizaka_private_high_school_uniform'
            },
            {
                local: '穗群原学园制服',
                raw: 'homurahara_academy_uniform'
            },
            {
                local: '神山高中校服',
                raw: 'kamiyama_high_school_uniform'
            },
            {
                local: '继续高中军服',
                raw: 'keizoku_military_uniform'
            },
            {
                local: '北高中制服',
                raw: 'kita_high_school_uniform'
            },
            {
                local: '清澄高中校服',
                raw: 'kiyosumi_school_uniform'
            },
            {
                local: '鲁纳诺娃魔法学校校服',
                raw: 'luna_nova_school_uniform'
            },
            {
                local: '明治女学生制服',
                raw: 'meiji_schoolgirl_uniform'
            },
            {
                local: '见泷原中学校制服',
                raw: 'mitakihara_school_uniform'
            },
            {
                local: '波路中学校服',
                raw: 'nami_junior_high_school_uniform'
            },
            {
                local: '七色丘中学校服',
                raw: 'nanairogaoka_middle_school_uniform'
            },
            {
                local: '七森中学校服',
                raw: 'nanamori_school_uniform'
            },
            {
                local: '私立直江津高校制服',
                raw: 'naoetsu_high_school_uniform'
            },
            {
                local: '新大岛学园校服',
                raw: 'national_shin_ooshima_school_uniform'
            },
            {
                local: '大洗联队军装',
                raw: 'ooarai_military_uniform'
            },
            {
                local: '大洗联队校服',
                raw: 'ooarai_school_uniform'
            },
            {
                local: '国立音乃木坂学院女子制服',
                raw: 'otonokizaka_school_uniform'
            },
            {
                local: '帕拉迪岛军装',
                raw: 'paradis_military_uniform'
            },
            {
                local: '极地迦勒底制服',
                raw: 'polar_chaldea_uniform'
            },
            {
                local: '真理学院军装',
                raw: 'pravda_military_uniform'
            },
            {
                local: '真理学院校服',
                raw: 'pravda_school_uniform'
            },
            {
                local: '点兔兔之家制服',
                raw: 'rabbit_house_uniform'
            },
            {
                local: '雷门足球队服',
                raw: 'raimon_soccer_uniform'
            },
            {
                local: '陵樱学园制服',
                raw: 'ryouou_school_uniform'
            },
            {
                local: '美少女战士制服',
                raw: 'sailor_senshi_uniform'
            },
            {
                local: '栅川中学校服',
                raw: 'sakugawa_school_uniform'
            },
            {
                local: '樱丘女子高等学校校服',
                raw: 'sakuragaoka_high_school_uniform'
            },
            {
                local: '桑德斯军装',
                raw: 'saunders_military_uniform'
            },
            {
                local: '桑德斯附高校服',
                raw: 'saunders_school_uniform'
            },
            {
                local: '圣祥大附小学校校服',
                raw: 'seishou_elementary_school_uniform'
            },
            {
                local: '死后世界战线制服',
                raw: 'shinda_sekai_sensen_uniform'
            },
            {
                local: '秀知院学园制服',
                raw: 'shuuchiin_academy_uniform'
            },
            {
                local: '秀尽学院制服',
                raw: 'shuujin_academy_uniform'
            },
            {
                local: '圣葛罗莉安娜军装',
                raw: "st._gloriana's_military_uniform"
            },
            {
                local: '圣葛罗莉安娜女学园校服',
                raw: "st._gloriana's_school_uniform"
            },
            {
                local: '星光学园制服',
                raw: 'starlight_academy_uniform'
            },
            {
                local: '时定高校校服',
                raw: 'tokisadame_school_uniform'
            },
            {
                local: '常盘台中学校服',
                raw: 'tokiwadai_school_uniform'
            },
            {
                local: '友枝小学校服',
                raw: 'tomoeda_elementary_school_uniform'
            },
            {
                local: '时空管理局军服',
                raw: 'tsab_ground_military_uniform'
            },
            {
                local: '雄英高中校服',
                raw: 'u.a._school_uniform'
            },
            {
                local: '浦之星女学院校服',
                raw: 'uranohoshi_school_uniform'
            },
            {
                local: '八十神高中校服',
                raw: 'yasogami_school_uniform'
            },
            {
                local: '双色比基尼',
                raw: 'mismatched_bikini'
            },
            {
                local: '多色款比基尼',
                raw: 'multicolored_bikini'
            }
        ],
        上衣: [
            {
                local: '女式衬衫',
                raw: 'blouse'
            },
            {
                local: '白衬衫',
                raw: 'white_shirt'
            },
            {
                local: '有领衬衫',
                raw: 'collared_shirt'
            },
            {
                local: '西服衬衫',
                raw: 'dress_shirt'
            },
            {
                local: '水手服衬衫',
                raw: 'sailor_shirt'
            },
            {
                local: '短衬衫',
                raw: 'cropped_shirt'
            },
            {
                local: 'T恤',
                raw: 't-shirt'
            },
            {
                local: '日常T恤',
                raw: 'casual T-shirts'
            },
            {
                local: '短袖T恤',
                raw: 'short sleeve T-shirts'
            },
            {
                local: '露肩衬衫(搭肩衫)',
                raw: 'off-shoulder_shirt'
            },
            {
                local: '包肩上衣',
                raw: 'shrug_(clothing)'
            },
            {
                local: '开襟毛衣衫',
                raw: 'cardigan'
            },
            {
                local: '交叉吊带衫',
                raw: 'criss-cross_halter'
            },
            {
                local: '褶边衬衫',
                raw: 'frilled_shirt'
            },
            {
                local: '长袖运动卫衣',
                raw: 'sweatshirt'
            },
            {
                local: '夏威夷衫',
                raw: 'hawaiian_shirt'
            },
            {
                local: '连帽衫',
                raw: 'hoodie'
            },
            {
                local: '贴合程度不合逻辑的衬衫',
                raw: 'Impossible shirt'
            },
            {
                local: '(烹饪时穿的)罩衫',
                raw: 'kappougi'
            },
            {
                local: '格子衬衫',
                raw: 'plaid_shirt'
            },
            {
                local: '马球衫',
                raw: 'polo_shirt'
            },
            {
                local: '印花衬衫',
                raw: 'print_shirt'
            },
            {
                local: '衬衫',
                raw: 'shirt'
            },
            {
                local: '无袖连帽衫',
                raw: 'sleeveless_hoodie'
            },
            {
                local: '无袖衬衫',
                raw: 'sleeveless_shirt'
            },
            {
                local: '条纹衬衫',
                raw: 'striped_shirt'
            },
            {
                local: '背心(居家)',
                raw: 'tank_top'
            },
            {
                local: '背心(正式)',
                raw: 'vest'
            },
            {
                local: '背心(正式)',
                raw: 'waistcoat'
            },
            {
                local: '吊帶背心(小可愛)',
                raw: 'camisole'
            },
            {
                local: '系带衬衫(把衣角和下擺打结)',
                raw: 'tied_shirt'
            },
            {
                local: '汗衫',
                raw: 'undershirt'
            },
            {
                local: '截短上衣',
                raw: 'crop_top'
            },
            {
                local: '高开衩的衣物',
                raw: 'highleg'
            },
            {
                local: '衣服漏洞',
                raw: 'clothing_cutout'
            },
            {
                local: '露背上衣',
                raw: 'back_cutout'
            },
            {
                local: '乳沟处开洞',
                raw: 'cleavage_cutout'
            },
            {
                local: '肚脐开洞',
                raw: 'navel_cutout'
            },
            {
                local: '露腰上衣',
                raw: 'midriff'
            },
            {
                local: '心形开口',
                raw: 'heart_cutout'
            },
            {
                local: '撕裂的衣服',
                raw: 'torn_clothes'
            },
            {
                local: '撕裂的衬衫',
                raw: 'torn_shirt'
            },
            {
                local: '脱衣服中',
                raw: 'undressing'
            },
            {
                local: '褪下衣物',
                raw: 'clothes_down'
            },
            {
                local: '掀起衬衫',
                raw: 'shirt_lift'
            },
            {
                local: '衬衫拉下来',
                raw: 'shirt_pull'
            },
            {
                local: '衬衫塞进去',
                raw: 'shirt_tucked_in'
            },
            {
                local: '拖拽衣服',
                raw: 'clothes_tug'
            },
            {
                local: '拖拽衬衫',
                raw: 'shirt_tug'
            },
            {
                local: '解开的衬衫',
                raw: 'untucked_shirt'
            },
            {
                local: '掀自己衣服',
                raw: 'lifted_by_self'
            },
            {
                local: '掀自己衣服',
                raw: 'untied'
            },
            {
                local: '敞开的衣服',
                raw: 'open_clothes'
            },
            {
                local: '解开纽扣的衬衫',
                raw: 'unbuttoned shirt'
            },
            {
                local: '纽扣之间的缝隙(没解开',
                raw: 'button_gap'
            },
            {
                local: '解开部分纽扣',
                raw: 'partially_unbuttoned'
            },
            {
                local: '拉开上部分拉链',
                raw: 'partially_unzipped'
            },
            {
                local: '脱下的衣服',
                raw: 'clothes_removed'
            },
            {
                local: '脱下衬衫',
                raw: 'shirt_removed'
            },
            {
                local: '衣服滑落',
                raw: 'wardrobe_error'
            },
            {
                local: '穿衣方式错了',
                raw: 'undersized_clothes'
            },
            {
                local: '衣物紧紧的',
                raw: 'tight'
            },
            {
                local: '嵌入(拉裆部衣物所致)',
                raw: 'wedgie'
            },
            {
                local: '衣服出了意外(如崩开)',
                raw: 'wardrobe_malfunction'
            },
            {
                local: '绷紧的衬衫',
                raw: 'taut_shirt'
            },
            {
                local: '绷紧的衣服',
                raw: 'taut_clothes'
            },
            {
                local: '勒出下胸围',
                raw: 'underbust'
            },
            {
                local: '过大号的衣服',
                raw: 'oversized_clothes'
            },
            {
                local: '过大号衬衫',
                raw: 'oversized_shirt'
            },
            {
                local: '男友的衣服',
                raw: 'borrowed_garments'
            },
            {
                local: '衣物吊带滑落(导致走光)',
                raw: 'strap_slip'
            },
            {
                local: '湿衬衫',
                raw: 'wet_shirt'
            },
            {
                local: '偷衣服',
                raw: 'clothes_theft'
            }
        ],
        外套: [
            {
                local: '西装外套',
                raw: 'blazer'
            },
            {
                local: '大衣',
                raw: 'overcoat'
            },
            {
                local: '双排纽扣(双排扣',
                raw: 'double-breasted'
            },
            {
                local: '长外套',
                raw: 'long_coat'
            },
            {
                local: '一种宽上衣',
                raw: 'haori'
            },
            {
                local: '冬季大衣',
                raw: 'winter_coat'
            },
            {
                local: '连帽大衣',
                raw: 'hooded_coat'
            },
            {
                local: '皮草大衣',
                raw: 'fur_coat'
            },
            {
                local: '镶边皮草大衣',
                raw: 'fur-trimmed_coat'
            },
            {
                local: '粗呢大衣',
                raw: 'duffel_coat'
            },
            {
                local: '渔网上衣',
                raw: 'fishnet_top'
            },
            {
                local: '派克大衣',
                raw: 'parka'
            },
            {
                local: '夹克衫',
                raw: 'jacket'
            },
            {
                local: '夹克部分移除',
                raw: 'jacket_partially_removed'
            },
            {
                local: '夹克被移除',
                raw: 'jacket_removed'
            },
            {
                local: '开襟夹克(配合spread_legs)',
                raw: 'open_jacket'
            },
            {
                local: '短款夹克',
                raw: 'cropped_jacket'
            },
            {
                local: '运动夹克',
                raw: 'track_jacket'
            },
            {
                local: '连帽运动夹克',
                raw: 'hooded_track_jacket'
            },
            {
                local: '军装夹克',
                raw: 'military_jacket'
            },
            {
                local: '迷彩夹克',
                raw: 'camouflage_jacket'
            },
            {
                local: '皮夹克',
                raw: 'leather_jacket'
            },
            {
                local: '莱特曼夹克',
                raw: 'letterman_jacket'
            },
            {
                local: '飞行员夹克',
                raw: 'bomber_jacket'
            },
            {
                local: '牛仔夹克',
                raw: 'denim_jacket'
            },
            {
                local: '休闲夹克',
                raw: 'loating_jacket'
            },
            {
                local: '毛皮边饰夹克',
                raw: 'fur-trimmed_jacket'
            },
            {
                local: '两色夹克',
                raw: 'two-tone_jacket'
            },
            {
                local: '风衣',
                raw: 'trench_coat'
            },
            {
                local: '振袖(和服的一部份)',
                raw: 'furisode'
            },
            {
                local: '冲锋衣',
                raw: 'windbreaker'
            },
            {
                local: '雨衣',
                raw: 'raincoat'
            },
            {
                local: '羽衣',
                raw: 'hagoromo'
            },
            {
                local: '束腰外衣',
                raw: 'tunic'
            },
            {
                local: '披肩',
                raw: 'cape'
            },
            {
                local: '披肩',
                raw: 'capelet'
            },
            {
                local: '冬装',
                raw: 'winter_clothes'
            },
            {
                local: '毛衣',
                raw: 'sweater'
            },
            {
                local: '套頭毛衣',
                raw: 'pullover_sweaters'
            },
            {
                local: '罗纹毛衣',
                raw: 'ribbed_sweater'
            },
            {
                local: '毛衣背心',
                raw: 'sweater_vest'
            },
            {
                local: '露背毛衣',
                raw: 'backless_sweater'
            },
            {
                local: '爱尔兰毛衣',
                raw: 'aran_sweater'
            },
            {
                local: '米色毛衣',
                raw: 'beige_sweater'
            },
            {
                local: '棕色毛衣',
                raw: 'brown_sweater'
            },
            {
                local: '连帽毛衣',
                raw: 'hooded_sweater'
            },
            {
                local: '露肩毛衣',
                raw: 'off-shoulder_sweater'
            },
            {
                local: '条纹毛衣',
                raw: 'striped_sweater'
            },
            {
                local: '处男杀手毛衣',
                raw: 'virgin_killer_sweater'
            },
            {
                local: '羽绒服',
                raw: 'down_jacket'
            },
            {
                local: '羽绒服',
                raw: 'puffer_jacket'
            }
        ],
        其他: [
            {
                local: '袜带',
                raw: 'garters'
            },
            {
                local: '腿环|袜带',
                raw: 'leg_garter'
            },
            {
                local: '吊带袜的吊带',
                raw: 'garter_straps'
            },
            {
                local: '大腿绑带',
                raw: 'thigh_strap'
            },
            {
                local: '大腿缎带',
                raw: 'thigh_ribbon'
            },
            {
                local: '腿锻带',
                raw: 'leg_ribbon'
            },
            {
                local: '腿上的绷带',
                raw: 'bandaid_on_leg'
            },
            {
                local: '包扎过的腿',
                raw: 'bandaged_leg'
            },
            {
                local: '脚踝系带',
                raw: 'ankle_lace-up'
            },
            {
                local: '大腿皮套',
                raw: 'thigh_holster'
            },
            {
                local: '膝盖上的创可贴',
                raw: 'bandaid_on_knee'
            },
            {
                local: '含菱形花纹的裤袜',
                raw: 'argyle_legwear'
            },
            {
                local: '带蝴蝶结的裤袜',
                raw: 'bow_legwear'
            },
            {
                local: '手臂袜带',
                raw: 'arm_garter'
            }
        ],
        腰部: [
            {
                local: '围裙',
                raw: 'apron'
            },
            {
                local: '腰围裙',
                raw: 'waist_apron'
            },
            {
                local: '女仆围裙',
                raw: 'maid_apron'
            },
            {
                local: '系在前腰的蝴蝶结',
                raw: 'bow tied at the waist'
            },
            {
                local: '穿在腰部的小披风',
                raw: 'waist_cape'
            },
            {
                local: '腰间衣服',
                raw: 'clothes_around_waist'
            },
            {
                local: '腰围夹克',
                raw: 'jacket_around_waist'
            },
            {
                local: '围腰毛衣',
                raw: 'sweater_around_waist'
            },
            {
                local: '缠腰布',
                raw: 'loincloth'
            },
            {
                local: '胸衣',
                raw: 'bustier'
            },
            {
                local: '束腰(马甲)',
                raw: 'corset'
            },
            {
                local: '紧身褡',
                raw: 'girdle'
            }
        ],
        盔甲: [
            {
                local: '盔甲',
                raw: 'armor'
            },
            {
                local: '比基尼盔甲',
                raw: 'bikini_armor'
            },
            {
                local: '穿着全套盔甲的',
                raw: 'full_armor'
            },
            {
                local: '板甲',
                raw: 'plate_armor'
            },
            {
                local: '日本铠甲',
                raw: 'japanese_armor'
            },
            {
                local: '腹当|草摺(日式下半盔甲',
                raw: 'kusazuri'
            },
            {
                local: '动力装甲',
                raw: 'power_armor'
            },
            {
                local: '机甲',
                raw: 'mecha'
            },
            {
                local: '头盔',
                raw: 'helmet'
            },
            {
                local: '头盔(日式)',
                raw: 'kabuto'
            },
            {
                local: '無肩甲盔甲',
                raw: 'off-shoulder_armor'
            },
            {
                local: '肩甲',
                raw: 'shoulder_armor'
            },
            {
                local: '日本弓道護胸甲',
                raw: 'muneate'
            },
            {
                local: '胸甲',
                raw: 'breastplate'
            },
            {
                local: '腹甲',
                raw: 'faulds'
            },
            {
                local: '胫甲',
                raw: 'greaves'
            },
            {
                local: '胫甲',
                raw: 'shin_guards'
            },
            {
                local: '装甲靴',
                raw: 'armored_boots'
            }
        ],
        裙子: [
            {
                local: '连衣裙',
                raw: 'dress'
            },
            {
                local: '微型连衣裙',
                raw: 'microdress'
            },
            {
                local: '长连衣裙',
                raw: 'long_dress'
            },
            {
                local: '露肩连衣裙',
                raw: 'off-shoulder_dress'
            },
            {
                local: '无肩带连衣裙',
                raw: 'strapless_dress'
            },
            {
                local: '露背连衣裙',
                raw: 'backless_dress'
            },
            {
                local: '绕颈露背吊带裙',
                raw: 'halter_dress'
            },
            {
                local: '吊帶連衣裙（大熱天穿的無袖連衣裙）',
                raw: 'sundress'
            },
            {
                local: '无袖连衣裙',
                raw: 'sleeveless_dress'
            },
            {
                local: '水手服款裙子',
                raw: 'sailor_dress'
            },
            {
                local: '夏日长裙',
                raw: 'summer_dress'
            },
            {
                local: '中国服饰',
                raw: 'china_dress'
            },
            {
                local: '围裙连衣裙',
                raw: 'pinafore_dress'
            },
            {
                local: '围裙连衣裙',
                raw: 'sweater_dress'
            },
            {
                local: '婚纱',
                raw: 'wedding_dress'
            },
            {
                local: '战甲裙',
                raw: 'armored_dress'
            },
            {
                local: '花边连衣裙',
                raw: 'frilled_dress'
            },
            {
                local: '蕾丝边连衣裙',
                raw: 'lace-trimmed_dress'
            },
            {
                local: '有领连衣裙',
                raw: 'collared_dress'
            },
            {
                local: '毛皮镶边连衣裙',
                raw: 'fur-trimmed_dress'
            },
            {
                local: '分层连衣裙',
                raw: 'layered_dress'
            },
            {
                local: '百褶连衣裙',
                raw: 'pleated_dress'
            },
            {
                local: '绷紧的连衣裙',
                raw: 'taut_dress'
            },
            {
                local: '铅笔裙',
                raw: 'pencil_dress'
            },
            {
                local: '过分紧身的衣服',
                raw: 'impossible_dress'
            },
            {
                local: '多色款连衣裙',
                raw: 'multicolored_dress'
            },
            {
                local: '条纹连衣裙',
                raw: 'striped_dress'
            },
            {
                local: '格子裙',
                raw: 'checkered_skirt'
            },
            {
                local: '格子连衣裙',
                raw: 'plaid_dress'
            },
            {
                local: '罗纹连衣裙',
                raw: 'ribbed_dress'
            },
            {
                local: '波点连衣裙',
                raw: 'polka_dot_dress'
            },
            {
                local: '印花连衣裙',
                raw: 'print_dress'
            },
            {
                local: '竖条纹连衣裙',
                raw: 'vertical-striped_dress'
            },
            {
                local: '透视连衣裙',
                raw: 'see-through_dress'
            },
            {
                local: '短裙',
                raw: 'skirt'
            },
            {
                local: '超短裙',
                raw: 'microskirt'
            },
            {
                local: '迷你裙',
                raw: 'miniskirt'
            },
            {
                local: '正装短裙',
                raw: 'skirt_suit'
            },
            {
                local: '比基尼裙',
                raw: 'bikini_skirt'
            },
            {
                local: '百褶裙',
                raw: 'pleated_skirt'
            },
            {
                local: '短铅笔裙',
                raw: 'pencil_skirt'
            },
            {
                local: '蓬蓬裙',
                raw: 'bubble_skirt'
            },
            {
                local: '芭蕾舞裙',
                raw: 'tutu'
            },
            {
                local: '蓬蓬裙(禮服)',
                raw: 'ballgown'
            },
            {
                local: '蓬蓬裙(兒童)',
                raw: 'pettiskirt'
            },
            {
                local: '展会女郎装束',
                raw: 'showgirl_skirt'
            },
            {
                local: '中等长裙子',
                raw: 'Medium length skirt'
            },
            {
                local: '皮带裙',
                raw: 'beltskirt'
            },
            {
                local: '牛仔裙',
                raw: 'denim_skirt'
            },
            {
                local: '吊带裙',
                raw: 'suspender_skirt'
            },
            {
                local: '与上衣搭配的短裙',
                raw: 'skirt_set'
            },
            {
                local: '长裙',
                raw: 'long_skirt'
            },
            {
                local: '夏日长裙',
                raw: 'summer_long_skirt'
            },
            {
                local: '外裙',
                raw: 'overskirt'
            },
            {
                local: '袴裙',
                raw: 'hakama_skirt'
            },
            {
                local: '高腰裙',
                raw: 'high-waist_skirt'
            },
            {
                local: '和服裙',
                raw: 'kimono_skirt'
            },
            {
                local: '背带裙;吊带裙',
                raw: 'suspender_long_skirt'
            },
            {
                local: '雪紡裙',
                raw: 'chiffon_skirt'
            },
            {
                local: '花边裙子',
                raw: 'frilled_skirt'
            },
            {
                local: '毛皮镶边短裙',
                raw: 'fur-trimmed_skirt'
            },
            {
                local: '蕾絲短裙',
                raw: 'lace_skirt'
            },
            {
                local: '蕾丝边短裙',
                raw: 'lace-trimmed_skirt'
            },
            {
                local: '缎带饰边短裙',
                raw: 'ribbon-trimmed_skirt'
            },
            {
                local: '分层的半裙',
                raw: 'layered_skirt'
            },
            {
                local: '印花短裙',
                raw: 'print_skirt'
            },
            {
                local: '多色款裙子',
                raw: 'multicolored_skirt'
            },
            {
                local: '条纹裙',
                raw: 'striped_skirt'
            },
            {
                local: '竖条纹裙子',
                raw: 'vertical-striped_skirt'
            },
            {
                local: '格子呢短裙',
                raw: 'plaid_skirt'
            },
            {
                local: '伞裙',
                raw: 'flared_skirt'
            },
            {
                local: '碎花裙',
                raw: 'floral_skirt'
            }
        ],
        与裙子互动: [
            {
                local: '优雅地提着裙子',
                raw: 'skirt_hold'
            },
            {
                local: '扯住裙摆|按住裙摆',
                raw: 'skirt_tug'
            },
            {
                local: '压住裙摆',
                raw: 'dress_tug'
            },
            {
                local: '掀起裙子',
                raw: 'skirt_lift'
            },
            {
                local: '一条腿上挂着短裙',
                raw: 'skirt_around_one_leg'
            },
            {
                local: '脱下的短裙',
                raw: 'skirt_removed'
            },
            {
                local: '脱下裙子',
                raw: 'dress_removed'
            },
            {
                local: '敞开的裙子',
                raw: 'open_skirt'
            }
        ],
        裤子: [
            {
                local: '连衣裙上的蝴蝶结',
                raw: 'dress_bow'
            },
            {
                local: '着装',
                raw: 'dressing_another'
            },
            {
                local: '短裙里穿着短裤',
                raw: 'shorts_under_skirt'
            },
            {
                local: '侧开衩',
                raw: 'side_slit'
            },
            {
                local: '短裤',
                raw: 'shorts'
            },
            {
                local: '小尺寸短裤',
                raw: 'micro_shorts'
            },
            {
                local: '热裤',
                raw: 'short_shorts'
            },
            {
                local: '热裤',
                raw: 'hot_pants'
            },
            {
                local: '热裤',
                raw: 'cutoffs'
            },
            {
                local: '条纹短裤',
                raw: 'striped_shorts'
            },
            {
                local: '吊带短裤',
                raw: 'suspender_shorts'
            },
            {
                local: '牛仔短裤',
                raw: 'denim_shorts'
            },
            {
                local: '蓬蓬的短裤',
                raw: 'puffy_shorts'
            },
            {
                local: '海豚短褲(真理褲)',
                raw: 'dolphin_shorts'
            },
            {
                local: '海豚短褲(真理褲)',
                raw: 'dolfin_shorts'
            },
            {
                local: '紧身裤/运动裤',
                raw: 'tight_pants'
            },
            {
                local: '无裆裤（紧身）',
                raw: 'crotchless_pants'
            },
            {
                local: '运动裤',
                raw: 'track_pants'
            },
            {
                local: '瑜伽裤',
                raw: 'yoga_pants'
            },
            {
                local: '自行车短裤',
                raw: 'bike_shorts'
            },
            {
                local: '体操短裤',
                raw: 'gym_shorts'
            },
            {
                local: '长裤',
                raw: 'pants'
            },
            {
                local: '蓬松裤/宽松裤',
                raw: 'puffy_pants'
            },
            {
                local: '南瓜裤',
                raw: 'pumpkin_pants'
            },
            {
                local: '袴裤',
                raw: 'hakama_pants'
            },
            {
                local: '哈伦裤',
                raw: 'harem_pants'
            },
            {
                local: '灯笼裤',
                raw: 'bloomers'
            },
            {
                local: '女式灯笼裤',
                raw: 'buruma'
            },
            {
                local: '牛仔裤',
                raw: 'jeans'
            },
            {
                local: '工装裤',
                raw: 'cargo_pants'
            },
            {
                local: '迷彩裤',
                raw: 'camouflage_pants'
            },
            {
                local: '七分裤',
                raw: 'capri_pants'
            },
            {
                local: '皮套裤(上宽下窄',
                raw: 'chaps'
            },
            {
                local: '(尤指女式)连衫裤',
                raw: 'jumpsuit'
            },
            {
                local: '低腰裤子',
                raw: 'lowleg_pants'
            },
            {
                local: '格子呢裤子',
                raw: 'plaid_pants'
            },
            {
                local: '单边长裤',
                raw: 'single_pantsleg'
            },
            {
                local: '条纹裤',
                raw: 'striped_pants'
            }
        ],
        与裤子互动: [
            {
                local: '不对称的裤子',
                raw: 'asymmetrical_legwear'
            },
            {
                local: '把连衣裤裆部剥到一边',
                raw: 'leotard_aside'
            },
            {
                local: '解开的裤子拉链',
                raw: 'open_fly'
            },
            {
                local: '褪下裤子',
                raw: 'pants_down'
            },
            {
                local: '裤子卷起来',
                raw: 'pants_rolled_up'
            },
            {
                local: '裤子塞进去',
                raw: 'pants_tucked_in'
            },
            {
                local: '破损的牛仔裤',
                raw: 'torn_jeans'
            },
            {
                local: '破损的裤子',
                raw: 'torn_pants'
            },
            {
                local: '破损的短裤',
                raw: 'torn_shorts'
            }
        ],
        袜子: [
            {
                local: '全身袜',
                raw: 'bodystocking'
            },
            {
                local: '连裤袜|裤袜',
                raw: 'pantyhose'
            },
            {
                local: '裤袜',
                raw: 'leggings'
            },
            {
                local: '裤袜(泛指裤袜或长筒袜)',
                raw: 'legwear'
            },
            {
                local: '长筒袜(过膝高筒袜)',
                raw: 'thighhighs'
            },
            {
                local: '中筒袜',
                raw: 'kneehighs'
            },
            {
                local: '短袜',
                raw: 'socks'
            },
            {
                local: '裸腿',
                raw: 'bare_legs'
            },
            {
                local: '连体黑丝',
                raw: 'black_bodystocking'
            },
            {
                local: '连体白丝',
                raw: 'white_bodystocking'
            },
            {
                local: '衣服下的袜子',
                raw: 'stocking_under_clothes'
            },
            {
                local: '黑丝裤袜',
                raw: 'black_pantyhose'
            },
            {
                local: '白丝裤袜',
                raw: 'white_pantyhose'
            },
            {
                local: '有腿环的裤袜',
                raw: 'thighband_pantyhose'
            },
            {
                local: '紧致的裤袜(勾勒出线条',
                raw: 'pantylines'
            },
            {
                local: '单边穿着连裤袜',
                raw: 'single_leg_pantyhose'
            },
            {
                local: '裤袜里的内裤',
                raw: 'panties_under_pantyhose'
            },
            {
                local: '网袜(材质)',
                raw: 'fishnets'
            },
            {
                local: '渔网袜',
                raw: 'stirrup_legwear'
            },
            {
                local: '露趾袜',
                raw: 'toeless_legwear'
            },
            {
                local: '双色裤袜',
                raw: 'mismatched_legwear'
            },
            {
                local: '双色裤袜',
                raw: 'two-tone_legwear'
            },
            {
                local: '不对称裤袜',
                raw: 'asymmetrical_legwear'
            },
            {
                local: '长短袜',
                raw: 'uneven_legwear'
            },
            {
                local: '白色长筒袜',
                raw: 'white_thighhighs'
            },
            {
                local: '黑色长筒袜',
                raw: 'black_thighhighs'
            },
            {
                local: '粉色长筒袜',
                raw: 'pink_thighhighs'
            },
            {
                local: '吊带袜',
                raw: 'suspenders'
            },
            {
                local: '腰带(吊带袜的)',
                raw: 'garter_straps'
            },
            {
                local: '破损的裤袜',
                raw: 'torn_legwear'
            },
            {
                local: '损坏了的长筒袜',
                raw: 'torn_thighhighs'
            },
            {
                local: '透明的袜子',
                raw: 'see-through_legwear_'
            },
            {
                local: '花边袜',
                raw: 'frilled_legwear'
            },
            {
                local: '蕾边袜丝',
                raw: 'lace-trimmed_legwear'
            },
            {
                local: '有接缝的袜',
                raw: 'seamed_legwear'
            },
            {
                local: '中间有一条黑线的袜子',
                raw: 'back-seamed_legwear'
            },
            {
                local: '动物耳朵过膝袜',
                raw: 'animal_ear_legwear'
            },
            {
                local: '横条纹袜',
                raw: 'striped_legwear'
            },
            {
                local: '竖条纹袜',
                raw: 'vertical-striped_legwear'
            },
            {
                local: '圆斑袜',
                raw: 'polka_dot_legwear'
            },
            {
                local: '印花袜',
                raw: 'print_legwear'
            },
            {
                local: '短裤穿在袜子外',
                raw: 'legwear_under_shorts'
            },
            {
                local: '过膝袜',
                raw: 'over-kneehighs'
            },
            {
                local: '鲍比袜(白短袜)',
                raw: 'bobby_socks'
            },
            {
                local: '日式厚底短袜(足袋)',
                raw: 'tabi'
            },
            {
                local: '泡泡袜',
                raw: 'loose_socks'
            },
            {
                local: '踝袜',
                raw: 'ankle_socks'
            },
            {
                local: '腿套|暖腿袜',
                raw: 'leg_warmers'
            },
            {
                local: '单短袜',
                raw: 'single_sock'
            },
            {
                local: '横条短袜',
                raw: 'striped_socks'
            }
        ],
        与袜子互动: [
            {
                local: '袜子有开口',
                raw: 'leg_cutout'
            },
            {
                local: '靴子穿在袜子外面',
                raw: 'thighhighs_under_boots'
            },
            {
                local: '整理裤袜',
                raw: 'adjusting_legwear'
            },
            {
                local: '褪下的裤袜',
                raw: 'pantyhose_pull'
            },
            {
                local: '脱袜子',
                raw: 'socks_removed'
            },
            {
                local: '拉着袜子(短袜',
                raw: 'sock_pull'
            },
            {
                local: '拉着袜子(长袜',
                raw: 'thighhighs_pull'
            }
        ],
        材质: [
            {
                local: '装甲的',
                raw: 'armored'
            },
            {
                local: '帆布的',
                raw: 'canvas'
            },
            {
                local: '牛仔布',
                raw: 'denim'
            },
            {
                local: '毛茸茸',
                raw: 'fluffy'
            },
            {
                local: '毛皮',
                raw: 'fur'
            },
            {
                local: '乳胶',
                raw: 'latex'
            },
            {
                local: '皮制',
                raw: 'leather'
            },
            {
                local: '透明',
                raw: 'see-through'
            },
            {
                local: '弹性纤维',
                raw: 'spandex'
            },
            {
                local: '紧身',
                raw: 'tight'
            }
        ],
        装饰: [
            {
                local: '褶边',
                raw: 'frilled'
            },
            {
                local: '中心褶花边',
                raw: 'center_frills'
            },
            {
                local: '起皱的(有褶的)',
                raw: 'crease'
            },
            {
                local: '分层的',
                raw: 'layered'
            },
            {
                local: '蕾丝',
                raw: 'lace'
            },
            {
                local: '皮草饰边',
                raw: 'fur_trim'
            },
            {
                local: '毛边的',
                raw: 'fur-trimmed'
            },
            {
                local: '材质增强',
                raw: 'fine_fabric_emphasis'
            },
            {
                local: '乳胶材质的长筒袜',
                raw: 'latex_thighhighs'
            },
            {
                local: '透明的长筒袜',
                raw: 'see-through_thighhighs'
            },
            {
                local: '露出屁股的服饰',
                raw: 'ass_cutout'
            },
            {
                local: '不对称的服饰',
                raw: 'asymmetrical_clothes'
            },
            {
                local: '(服饰)打在背后的结',
                raw: 'back_bow'
            },
            {
                local: '服饰互换',
                raw: 'costume_switch'
            },
            {
                local: '交叉花边服饰',
                raw: 'cross-laced_clothes'
            },
            {
                local: '服饰上有两条平行条纹',
                raw: 'double_vertical_stripe'
            },
            {
                local: '吊带式的上身的服饰',
                raw: 'halter_top'
            },
            {
                local: '多色款腿部服饰',
                raw: 'multicolored_legwear'
            },
            {
                local: '海军蓝腿部服饰',
                raw: 'navy_blue_legwear'
            },
            {
                local: '改款过的日本服饰',
                raw: 'nontraditional_miko'
            },
            {
                local: '侧边开口的服饰',
                raw: 'side_cutout'
            },
            {
                local: '侧面有缝的服饰',
                raw: 'side_slit'
            },
            {
                local: '侧面没有布料的服饰',
                raw: 'sideless_outfit'
            },
            {
                local: '单边穿着过膝服饰',
                raw: 'single_kneehigh'
            },
            {
                local: '露出单边服饰上的垂直条纹',
                raw: 'single_vertical_stripe'
            },
            {
                local: '高领服饰',
                raw: 'turtleneck'
            },
            {
                local: '双层样式的服饰画法',
                raw: 'two-sided_fabric'
            },
            {
                local: '带O型环的衣物',
                raw: 'o-ring'
            },
            {
                local: '带O型环的上衣',
                raw: 'o-ring_top'
            },
            {
                local: '须边(围巾末端',
                raw: 'fringe_trim'
            },
            {
                local: '松散的带子(衣物)',
                raw: 'loose_belt'
            },
            {
                local: '小绒球(衣物挂件)',
                raw: 'pom_pom_(clothes)'
            },
            {
                local: '衣服的抽绳',
                raw: 'drawstring'
            },
            {
                local: '有整件衣物长的拉链',
                raw: 'full-length_zipper'
            },
            {
                local: '褶裥(衣物)',
                raw: 'gathers'
            },
            {
                local: '缝在衣服上衬料',
                raw: 'gusset'
            },
            {
                local: '胸口的袋子',
                raw: 'breast_pocket'
            }
        ],
        花纹: [
            {
                local: '阿盖尔菱形花纹',
                raw: 'argyle'
            },
            {
                local: '格子花纹',
                raw: 'checkered'
            },
            {
                local: '多彩条纹',
                raw: 'colored_stripes'
            },
            {
                local: '斜条纹',
                raw: 'diagonal_stripes'
            },
            {
                local: '水平条纹',
                raw: 'horizontal_stripes'
            },
            {
                local: '多彩条纹',
                raw: 'multicolored_stripes'
            },
            {
                local: '点装纹',
                raw: 'polka_dot_'
            },
            {
                local: '棱纹',
                raw: 'ribbed'
            },
            {
                local: '横条纹',
                raw: 'striped'
            },
            {
                local: '连续重复花纹',
                raw: 'unmoving_pattern'
            },
            {
                local: '竖条纹',
                raw: 'vertical_stripes'
            },
            {
                local: '格子呢图案',
                raw: 'plaid'
            },
            {
                local: '动物印花',
                raw: 'animal_print'
            },
            {
                local: '猫咪印花',
                raw: 'cat_print'
            },
            {
                local: '熊印花',
                raw: 'bear_print'
            },
            {
                local: '鸟印花',
                raw: 'bird_print'
            },
            {
                local: '兔子印花',
                raw: 'bunny_print'
            },
            {
                local: '奶牛印花',
                raw: 'cow_print'
            },
            {
                local: '龙印花',
                raw: 'dragon_print'
            },
            {
                local: '鱼印花',
                raw: 'fish_print'
            },
            {
                local: '青蛙印花',
                raw: 'frog_print'
            },
            {
                local: '鲨鱼印花',
                raw: 'shark_print'
            },
            {
                local: '蛇纹',
                raw: 'snake_print'
            },
            {
                local: '斑马印花',
                raw: 'zebra_print'
            },
            {
                local: '虎纹',
                raw: 'tiger_print'
            },
            {
                local: '豹纹',
                raw: 'leopard_print'
            },
            {
                local: '美洲豹印花',
                raw: 'jaguar_print'
            },
            {
                local: '蝙蝠印花',
                raw: 'bat_print'
            },
            {
                local: '土狼印花',
                raw: 'aardwolf_print'
            },
            {
                local: '非洲野狗印花',
                raw: 'african_wild_dog_print'
            },
            {
                local: '猎豹印花',
                raw: 'cheetah_print'
            },
            {
                local: '狗印花',
                raw: 'dog_print'
            },
            {
                local: '狐狸印花',
                raw: 'fox_print'
            },
            {
                local: '长颈鹿印花',
                raw: 'giraffe_print'
            },
            {
                local: '熊猫印花',
                raw: 'panda_print'
            },
            {
                local: '沙猫印花',
                raw: 'sand_cat_print'
            },
            {
                local: '鲸鱼印花',
                raw: 'whale_print'
            },
            {
                local: '白虎纹',
                raw: 'white_tiger_print'
            },
            {
                local: '金鱼印花',
                raw: 'goldfish_print'
            },
            {
                local: '翼印',
                raw: 'wing_print'
            },
            {
                local: '蛛网纹',
                raw: 'spider_web_print'
            },
            {
                local: '蝴蝶印花',
                raw: 'butterfly_print'
            },
            {
                local: '碎花',
                raw: 'floral_print'
            },
            {
                local: '叶印花',
                raw: 'leaf_print'
            },
            {
                local: '三叶草印花',
                raw: 'clover_print'
            },
            {
                local: '枫叶印花',
                raw: 'maple_leaf_print'
            },
            {
                local: '玫瑰印花',
                raw: 'rose_print'
            },
            {
                local: '草莓印花',
                raw: 'strawberry_print'
            },
            {
                local: '樱桃印花',
                raw: 'cherry_print'
            },
            {
                local: '竹印花',
                raw: 'bamboo_print'
            },
            {
                local: '胡萝卜印花',
                raw: 'carrot_print'
            },
            {
                local: '芙蓉印花',
                raw: 'hibiscus_print'
            },
            {
                local: '南瓜灯印花',
                raw: "jack-o'-lantern_print"
            },
            {
                local: '花瓣印花',
                raw: 'petal_print'
            },
            {
                local: '向日葵印花',
                raw: 'sunflower_print'
            },
            {
                local: '西瓜印花',
                raw: 'watermelon_print'
            },
            {
                local: '天空印花',
                raw: 'sky_print'
            },
            {
                local: '云印花',
                raw: 'cloud_print'
            },
            {
                local: '闪电印花',
                raw: 'lightning_bolt_print'
            },
            {
                local: '彩虹印花',
                raw: 'rainbow_print'
            },
            {
                local: '雪花印花',
                raw: 'snowflake_print'
            },
            {
                local: '星空印花',
                raw: 'starry_sky_print'
            },
            {
                local: '新月印花',
                raw: 'crescent_print'
            },
            {
                local: '星形印花',
                raw: 'star_print'
            },
            {
                local: '星形符号',
                raw: 'star_(symbol)'
            },
            {
                local: '月亮印花',
                raw: 'moon_print'
            },
            {
                local: '太阳印花',
                raw: 'sun_print'
            },
            {
                local: '字符印花',
                raw: 'character_print'
            },
            {
                local: '衣服上的字',
                raw: 'clothes_writing_'
            },
            {
                local: '锚印花',
                raw: 'anchor_print'
            },
            {
                local: '樱花印花',
                raw: 'cherry_blossom_print'
            },
            {
                local: '音符印花',
                raw: 'musical_note_print'
            },
            {
                local: '三角印花',
                raw: 'triangle_print'
            },
            {
                local: '箭头打印',
                raw: 'arrow_print'
            },
            {
                local: '波浪纹',
                raw: 'wave_print'
            },
            {
                local: '☮(东方仗助衣服上有)',
                raw: 'peace_symbol'
            },
            {
                local: '心形图案|心形印花',
                raw: 'heart_print'
            },
            {
                local: '火焰印花',
                raw: 'flame_print'
            },
            {
                local: '鬼火印花',
                raw: 'hitodama_print'
            },
            {
                local: '爪印花',
                raw: 'paw_print'
            },
            {
                local: '骨架印花',
                raw: 'skeleton_print'
            },
            {
                local: '骷髅头印花',
                raw: 'skull_print'
            },
            {
                local: '闪闪发光的印花',
                raw: 'sparkle_print'
            },
            {
                local: '阴阳印花',
                raw: 'yin_yang_print'
            },
            {
                local: '十字架元素图案',
                raw: 'cross_print'
            },
            {
                local: '迷彩',
                raw: 'camoflage'
            },
            {
                local: '旗帜印花',
                raw: 'flag_print'
            },
            {
                local: '骨印花',
                raw: 'bone_print'
            },
            {
                local: '幽灵印画',
                raw: 'ghost_print'
            },
            {
                local: '蘑菇印花',
                raw: 'mushroom_print'
            },
            {
                local: '饭团打印',
                raw: 'onigiri_print'
            },
            {
                local: '猫耳造型',
                raw: 'cat_ear'
            },
            {
                local: '猫耳造型镂空',
                raw: 'cat_ear_cutout'
            }
        ],
        鞋子: [
            {
                local: '赤脚',
                raw: 'barefoot'
            },
            {
                local: '没有鞋子',
                raw: 'no_shoes'
            },
            {
                local: '脱下的鞋子',
                raw: 'shoes_removed'
            },
            {
                local: '单鞋',
                raw: 'single_shoe'
            },
            {
                local: '单鞋',
                raw: 'the_only_shoe'
            },
            {
                local: '乐福鞋(小皮鞋)',
                raw: 'black_loafers'
            },
            {
                local: '运动鞋',
                raw: 'shoes'
            },
            {
                local: '室内鞋',
                raw: 'uwabaki'
            },
            {
                local: '厚底鞋',
                raw: 'platform_footwear'
            },
            {
                local: '高跟鞋',
                raw: 'high_heels'
            },
            {
                local: '细跟高跟鞋',
                raw: 'stiletto_heels'
            },
            {
                local: '带束带的高跟鞋',
                raw: 'strappy_heels'
            },
            {
                local: '厚底高跟鞋',
                raw: 'platform_heels_'
            },
            {
                local: '舰C舰娘专用鞋',
                raw: 'rudder_footwear'
            },
            {
                local: '凉鞋',
                raw: 'sandals'
            },
            {
                local: '裸足凉鞋',
                raw: 'barefoot_sandals'
            },
            {
                local: '木屐凉鞋',
                raw: 'clog_sandals'
            },
            {
                local: '木屐',
                raw: 'geta'
            },
            {
                local: '拖鞋',
                raw: 'slippers'
            },
            {
                local: '溜冰鞋',
                raw: 'skates'
            },
            {
                local: '旱冰鞋',
                raw: 'roller_skates'
            },
            {
                local: '动物脚',
                raw: 'animal_feet'
            },
            {
                local: '动物拖鞋',
                raw: 'animal_slippers'
            },
            {
                local: '脚环',
                raw: 'anklet'
            },
            {
                local: '镣铐',
                raw: 'shackles'
            },
            {
                local: '棕色鞋类',
                raw: 'brown_footwear'
            },
            {
                local: '交叉系带鞋',
                raw: 'cross-laced_footwear'
            },
            {
                local: '乐福鞋',
                raw: 'loafers'
            },
            {
                local: '珍妮鞋',
                raw: 'mary_janes'
            },
            {
                local: '双色鞋子',
                raw: 'mismatched_footwear'
            },
            {
                local: '尖头鞋',
                raw: 'pointy_footwear'
            },
            {
                local: '低胸装高跟鞋打扮',
                raw: 'pumps'
            },
            {
                local: '脱下凉鞋',
                raw: 'sandals_removed'
            },
            {
                local: '鞋底',
                raw: 'shoe_soles'
            },
            {
                local: '鞋带',
                raw: 'shoelaces'
            },
            {
                local: '运动鞋',
                raw: 'sneakers'
            },
            {
                local: '带翅膀的鞋子',
                raw: 'winged_footwear'
            },
            {
                local: '日式草鞋',
                raw: 'zouri'
            }
        ],
        靴子: [
            {
                local: '靴子',
                raw: 'boots'
            },
            {
                local: '脱下的靴子',
                raw: 'boots_removed'
            },
            {
                local: '大腿靴',
                raw: 'thigh_boots'
            },
            {
                local: '及膝靴(马靴)',
                raw: 'knee_boots'
            },
            {
                local: '系带靴',
                raw: 'cross-laced_footwear'
            },
            {
                local: '踝靴',
                raw: 'ankle_boots'
            },
            {
                local: '高跟靴',
                raw: 'high_heel_boots'
            },
            {
                local: '露趾靴',
                raw: 'toeless_boots'
            },
            {
                local: '系带靴',
                raw: 'lace-up_boots'
            },
            {
                local: '毛边靴子',
                raw: 'fur-trimmed_boots'
            },
            {
                local: '雪地靴',
                raw: 'snow_boots'
            },
            {
                local: '脚链',
                raw: 'anklet'
            },
            {
                local: '胶靴',
                raw: 'rubber_boots'
            },
            {
                local: '圣诞靴',
                raw: 'santa_boots'
            },
            {
                local: '皮靴',
                raw: 'leather_boots'
            },
            {
                local: '靴子下的长筒袜',
                raw: 'thighhighs_under_boots'
            },
            {
                local: '作战靴',
                raw: 'combat_boots'
            },
            {
                local: '马丁靴',
                raw: 'doc_martens'
            },
            {
                local: '雨靴',
                raw: 'rain_boots'
            },
            {
                local: '皮带靴',
                raw: 'belt_boots'
            },
            {
                local: '矮跟休闲皮草靴',
                raw: 'fur_boots'
            },
            {
                local: '一只脚没穿靴子',
                raw: 'single_boot'
            }
        ],
        鞋底: [
            {
                local: '鞋底',
                raw: 'shoe_soles'
            },
            {
                local: '拱形鞋底',
                raw: 'arched_soles'
            },
            {
                local: '爪印鞋底',
                raw: 'paw_print_soles'
            },
            {
                local: '马蹄铁',
                raw: 'horseshoe'
            }
        ],
        领口: [
            {
                local: '水手领',
                raw: 'sailor_collar'
            },
            {
                local: '毛皮衣领',
                raw: 'fur_collar'
            },
            {
                local: '花边衣领',
                raw: 'frilled_collar'
            },
            {
                local: '竖起来的衣领',
                raw: 'popped_collar'
            },
            {
                local: '颈部饰品',
                raw: 'choker'
            },
            {
                local: '黑色颈圈',
                raw: 'black_choker'
            },
            {
                local: '皮带颈环',
                raw: 'belt_collar'
            },
            {
                local: '褶边项链',
                raw: 'frilled_choker'
            },
            {
                local: '领巾',
                raw: 'neckerchief'
            },
            {
                local: '红领巾',
                raw: 'red_neckerchief'
            },
            {
                local: '领带',
                raw: 'necktie'
            },
            {
                local: '短领带',
                raw: 'short_necktie'
            },
            {
                local: '白色领带',
                raw: 'white_necktie'
            },
            {
                local: '蝴蝶结领带',
                raw: 'bowtie'
            },
            {
                local: '挂在脖子上的耳机',
                raw: 'headphones_around_neck'
            },
            {
                local: '脖子上护目镜',
                raw: 'goggles_around_neck'
            },
            {
                local: '颈铃',
                raw: 'neck_bell'
            },
            {
                local: '领口',
                raw: 'neck_ruff'
            },
            {
                local: 'V领',
                raw: 'v-neck'
            },
            {
                local: '脖子上的毛巾',
                raw: 'towel_around_neck'
            },
            {
                local: '宽松领带',
                raw: 'loose_necktie'
            },
            {
                local: '颈部纹身',
                raw: 'neck_tattoo'
            },
            {
                local: '领巾状宽领带',
                raw: 'ascot'
            },
            {
                local: '颈丝带',
                raw: 'ribbon_choker'
            },
            {
                local: '阴贴/乳贴',
                raw: 'maebari/pasties'
            },
            {
                local: '乳贴',
                raw: 'latex'
            },
            {
                local: '破烂衣服',
                raw: 'torn_clothes'
            },
            {
                local: '铁十字勋章',
                raw: 'iron_cross'
            },
            {
                local: '中国结',
                raw: 'chinese_knot'
            },
            {
                local: '十字架项链',
                raw: 'cross_necklace'
            },
            {
                local: '珠子项链',
                raw: 'bead_necklace'
            },
            {
                local: '珍珠项链',
                raw: 'pearl_necklace'
            },
            {
                local: '心形项链',
                raw: 'heart_necklace'
            },
            {
                local: '胡萝卜项链',
                raw: 'carrot_necklace'
            },
            {
                local: '锁链项链',
                raw: 'chain_necklace'
            },
            {
                local: '珠玉项链',
                raw: 'magatama_necklace'
            },
            {
                local: '牙项链',
                raw: 'tooth_necklace'
            },
            {
                local: '钥匙项链',
                raw: 'key_necklace'
            },
            {
                local: '锚项链',
                raw: 'anchor_necklace'
            },
            {
                local: '骷髅项链',
                raw: 'skull_necklace'
            },
            {
                local: '贝壳项链',
                raw: 'shell_necklace'
            },
            {
                local: '金项链',
                raw: 'gold_necklace'
            },
            {
                local: '新月项链',
                raw: 'crescent_necklace'
            },
            {
                local: '戒指项链',
                raw: 'ring_necklace'
            },
            {
                local: '羽毛项链',
                raw: 'feather_necklace'
            },
            {
                local: '骨项链',
                raw: 'bone_necklace'
            },
            {
                local: '十字项链',
                raw: 'ankh_necklace'
            },
            {
                local: '多条项链',
                raw: 'multiple_necklaces'
            },
            {
                local: '子弹项链',
                raw: 'bullet_necklace'
            },
            {
                local: '拿着项链',
                raw: 'holding_necklace'
            },
            {
                local: '项链被移除',
                raw: 'necklace_removed'
            },
            {
                local: '棕色领饰',
                raw: 'brown_neckwear'
            },
            {
                local: '格子领口',
                raw: 'checkered_neckwear'
            },
            {
                local: '斜纹领结',
                raw: 'diagonal-striped_neckwear'
            },
            {
                local: '绕颈系带',
                raw: 'halterneck'
            },
            {
                local: '脖子上有痣',
                raw: 'mole_on_neck'
            },
            {
                local: '脖子',
                raw: 'neck'
            },
            {
                local: '颈部系着缎带',
                raw: 'neck_ribbon'
            },
            {
                local: '颈环',
                raw: 'neck_ring'
            },
            {
                local: '项链',
                raw: 'necklace'
            },
            {
                local: '格子呢领子',
                raw: 'plaid_neckwear'
            },
            {
                local: '深领',
                raw: 'plunging_neckline'
            },
            {
                local: '印花领带',
                raw: 'print_neckwear'
            },
            {
                local: '无袖高领毛衣',
                raw: 'sleeveless_turtleneck'
            },
            {
                local: '星形项链',
                raw: 'star_necklace'
            },
            {
                local: '条纹领子',
                raw: 'striped_neckwear'
            },
            {
                local: '高领毛衣',
                raw: 'turtleneck_sweater'
            },
            {
                local: '解开领带',
                raw: 'undone_necktie'
            },
            {
                local: '脖子上挂着口哨',
                raw: 'whistle_around_neck'
            }
        ],
        围巾: [
            {
                local: '格子围巾',
                raw: 'plaid_scarf'
            },
            {
                local: '条纹围巾',
                raw: 'striped_scarf'
            },
            {
                local: '印花围巾',
                raw: 'print_scarf'
            },
            {
                local: '竖条纹围巾',
                raw: 'vertical-striped_scarf'
            },
            {
                local: '波点围巾',
                raw: 'polka_dot_scarf'
            },
            {
                local: '菱形围巾',
                raw: 'argyle_scarf'
            },
            {
                local: '米色围巾',
                raw: 'beige_scarf'
            },
            {
                local: '围巾蝴蝶结',
                raw: 'scarf_bow'
            },
            {
                local: '皮草围巾',
                raw: 'fur_scarf'
            },
            {
                local: '裸围巾',
                raw: 'naked_scarf'
            },
            {
                local: '五彩围巾',
                raw: 'multicolored_scarf'
            },
            {
                local: '漂浮围巾',
                raw: 'floating_scarf'
            },
            {
                local: '长围巾',
                raw: 'long_scarf'
            },
            {
                local: '手臂围巾',
                raw: 'arm_scarf'
            },
            {
                local: '头上的围巾',
                raw: 'scarf_on_head'
            },
            {
                local: '围巾在嘴上',
                raw: 'scarf_over_mouth'
            },
            {
                local: '围巾被取下',
                raw: 'scarf_removed'
            },
            {
                local: '调整围巾',
                raw: 'adjusting_scarf'
            },
            {
                local: '拿着围巾',
                raw: 'holding_scarf'
            },
            {
                local: '扯围巾',
                raw: 'scarf_pull'
            },
            {
                local: '棕色围巾',
                raw: 'brown_scarf'
            },
            {
                local: '围巾',
                raw: 'scarf'
            }
        ],
        眼镜: [
            {
                local: '眼镜',
                raw: 'glasses'
            },
            {
                local: '眼睛',
                raw: 'eyewear'
            },
            {
                local: '单片眼镜',
                raw: 'monocle'
            },
            {
                local: '带框眼镜',
                raw: 'under-rim_eyewear'
            },
            {
                local: '无框眼镜',
                raw: 'rimless_eyewear'
            },
            {
                local: '半无框眼镜',
                raw: 'semi-rimless_eyewear'
            },
            {
                local: '红框眼镜',
                raw: 'red-framed_eyewear'
            },
            {
                local: '圆框眼镜',
                raw: 'round_eyewear'
            },
            {
                local: '黑框眼镜',
                raw: 'black-framed_eyewear'
            },
            {
                local: '有色眼镜',
                raw: 'tinted_eyewear'
            },
            {
                local: '医用眼罩',
                raw: 'medical_eyepatch'
            },
            {
                local: '用绷带包扎一只眼睛',
                raw: 'bandage_over_one_eye'
            },
            {
                local: '歪斜的眼镜',
                raw: 'crooked_eyewear'
            },
            {
                local: '取下眼镜',
                raw: 'eyewear_removed'
            },
            {
                local: '太阳镜',
                raw: 'sunglasses'
            },
            {
                local: '风镜',
                raw: 'goggles'
            },
            {
                local: '眼罩',
                raw: 'Blindfold'
            },
            {
                local: '眼罩(独眼)',
                raw: 'eyepatch'
            },
            {
                local: '面罩|遮阳帽舌|遮阳板',
                raw: 'visor'
            },
            {
                local: '戴眼镜的',
                raw: 'bespectacled'
            },
            {
                local: '蓝框眼镜',
                raw: 'blue-framed_eyewear'
            },
            {
                local: '棕色镜框眼镜',
                raw: 'brown-framed_eyewear'
            },
            {
                local: '厚如玻璃瓶底的圆眼镜',
                raw: 'coke-bottle_glasses'
            },
            {
                local: '去掉了(原设有的)眼镜',
                raw: 'no_eyewear'
            },
            {
                local: '没透出眼睛的眼镜',
                raw: 'opaque_glasses'
            },
            {
                local: '下半无框眼镜',
                raw: 'over-rim_eyewear'
            }
        ],
        面具: [
            {
                local: '面具',
                raw: 'mask'
            },
            {
                local: '半面罩',
                raw: 'half_mask'
            },
            {
                local: '蒙面',
                raw: 'masked'
            },
            {
                local: '抬起面罩',
                raw: 'mask_lift'
            },
            {
                local: '掀到头上的面具',
                raw: 'mask_on_head'
            },
            {
                local: '摘下的面具',
                raw: 'mask_removed'
            },
            {
                local: '口罩',
                raw: 'mouth_mask'
            },
            {
                local: '医用口罩',
                raw: 'surgical_mask'
            },
            {
                local: '瘟疫医生口罩',
                raw: 'plague_doctor_mask'
            },
            {
                local: '防毒面具',
                raw: 'gas_mask'
            },
            {
                local: '面甲',
                raw: 'visor'
            },
            {
                local: '头盔',
                raw: 'helmet'
            },
            {
                local: '狐狸面具',
                raw: 'fox_mask'
            },
            {
                local: '潜水面罩',
                raw: 'diving_mask'
            },
            {
                local: '头戴式潜水面罩',
                raw: 'diving_mask_on_head'
            },
            {
                local: '鬼面具',
                raw: 'oni_mask'
            },
            {
                local: '天狗面具',
                raw: 'tengu_mask'
            },
            {
                local: '忍者面具',
                raw: 'ninja_mask'
            },
            {
                local: '骷髅面具',
                raw: 'skull_mask'
            },
            {
                local: '曲棍球面具',
                raw: 'hockey_mask'
            },
            {
                local: '鸟面具',
                raw: 'bird_mask'
            },
            {
                local: '石鬼面',
                raw: 'stone_mask'
            },
            {
                local: '马面具',
                raw: 'horse_mask'
            },
            {
                local: '化妆舞会面具',
                raw: 'masquerade_mask'
            },
            {
                local: 'SM面具',
                raw: 'domino_mask'
            }
        ],
        手臂: [
            {
                local: '长袖',
                raw: 'long_sleeves'
            },
            {
                local: '短袖',
                raw: 'short_sleeves'
            },
            {
                local: '宽袖',
                raw: 'wide_sleeves'
            },
            {
                local: '振袖',
                raw: 'furisode'
            },
            {
                local: '分离式袖子',
                raw: 'detached_sleeves'
            },
            {
                local: '单袖',
                raw: 'single_sleeve'
            },
            {
                local: '无袖',
                raw: 'sleeveless'
            },
            {
                local: '不对称袖子',
                raw: 'asymmetrical_sleeves'
            },
            {
                local: '蓬松的袖子',
                raw: 'puffy_sleeves'
            },
            {
                local: '蓬蓬长袖',
                raw: 'puffy_long_sleeves'
            },
            {
                local: '蓬蓬短袖',
                raw: 'puffy_short_sleeves'
            },
            {
                local: '褶袖边',
                raw: 'frilled_sleeves'
            },
            {
                local: '朱丽叶袖',
                raw: 'juliet_sleeves'
            },
            {
                local: '绷带手臂',
                raw: 'bandaged_arm'
            },
            {
                local: '插肩袖',
                raw: 'raglan_sleeves'
            },
            {
                local: '下臂护甲',
                raw: 'vambraces'
            },
            {
                local: '分层袖子',
                raw: 'layered_sleeves'
            },
            {
                local: '毛边袖子',
                raw: 'fur-trimmed_sleeves'
            },
            {
                local: '透明袖子',
                raw: 'see-through_sleeves'
            },
            {
                local: '撕裂的袖子',
                raw: 'torn_sleeves'
            },
            {
                local: '袖子过指',
                raw: 'sleeves_past_fingers'
            },
            {
                local: '袖子过腕',
                raw: 'sleeves_past_wrists'
            },
            {
                local: '袖子过肘',
                raw: 'sleeves_past_elbows'
            },
            {
                local: '袖子上推',
                raw: 'sleeves_pushed_up'
            },
            {
                local: '袖子里的手臂',
                raw: 'arm_out_of_sleeve'
            },
            {
                local: '不均匀的袖子',
                raw: 'uneven_sleeves'
            },
            {
                local: '不匹配的袖子',
                raw: 'mismatched_sleeves'
            },
            {
                local: '袖子卷起',
                raw: 'sleeve_rolled_up'
            },
            {
                local: '单只袖子卷起',
                raw: 'sleeves_rolled_up'
            },
            {
                local: '羽毛装饰的袖子',
                raw: 'feather-trimmed_sleeves'
            },
            {
                local: '双手交叉伸进袖子里',
                raw: 'hands_in_opposite_sleeves'
            },
            {
                local: '蕾丝边袖子',
                raw: 'lace-trimmed_sleeves'
            },
            {
                local: '掐袖子',
                raw: 'pinching_sleeves'
            },
            {
                local: '蓬蓬的袖子',
                raw: 'puffy_detached_sleeves'
            },
            {
                local: '棱纹袖子',
                raw: 'ribbed_sleeves'
            },
            {
                local: '单边没脱掉的袖子',
                raw: 'single_detached_sleeve'
            },
            {
                local: '叠起来的袖子',
                raw: 'sleeves_folded_up'
            },
            {
                local: '条纹袖子',
                raw: 'striped_sleeves'
            },
            {
                local: '和袖子分开的手腕的袖口',
                raw: 'wrist_cuffs'
            },
            {
                local: '袖章(臂带)',
                raw: 'armband'
            },
            {
                local: '臂镯',
                raw: 'armlet'
            }
        ],
        手: [
            {
                local: '绷带',
                raw: 'bandage'
            },
            {
                local: '皮带',
                raw: 'leash'
            },
            {
                local: '手臂纹身',
                raw: 'arm_tattoo'
            },
            {
                local: '数字文身',
                raw: 'number_tattoo'
            },
            {
                local: '珠子手链',
                raw: 'bead_bracelet'
            },
            {
                local: '手镯',
                raw: 'bracelet'
            },
            {
                local: '花手镯',
                raw: 'flower_bracelet'
            },
            {
                local: '带钉手镯',
                raw: 'spiked_bracelet'
            },
            {
                local: '腕饰',
                raw: 'wrist_cuffs'
            },
            {
                local: '腕带',
                raw: 'wristband'
            },
            {
                local: '护腕',
                raw: 'bracer'
            },
            {
                local: '袖口',
                raw: 'cuffs'
            },
            {
                local: '绑定手腕',
                raw: 'bound_wrists'
            },
            {
                local: '手腕发圈',
                raw: 'wrist_scrunchie'
            },
            {
                local: '手铐',
                raw: 'handcuffs'
            },
            {
                local: '手铐',
                raw: 'shackles'
            },
            {
                local: '锁链',
                raw: 'chains'
            },
            {
                local: '锁链带牵绳',
                raw: 'chain_leash'
            }
        ],
        手套: [
            {
                local: '手套',
                raw: 'gloves'
            },
            {
                local: '脱下手套',
                raw: 'gloves_removed'
            },
            {
                local: '去掉了(原设有的)手套',
                raw: 'no_gloves'
            },
            {
                local: '单只手套',
                raw: 'single_glove'
            },
            {
                local: '单手戴着过肘的手套',
                raw: 'single_elbow_glove'
            },
            {
                local: '长手套',
                raw: 'long_gloves'
            },
            {
                local: '长袖手套（肘部手套）',
                raw: 'elbow_gloves'
            },
            {
                local: '新娘手套',
                raw: 'bridal_gauntlets'
            },
            {
                local: '很短的手套|半截手套',
                raw: 'half_gloves'
            },
            {
                local: '露指手套',
                raw: 'fingerless_gloves'
            },
            {
                local: '部分露指手套',
                raw: 'partially_fingerless_gloves'
            },
            {
                local: '爪子手套(分指手套)',
                raw: 'paw_gloves'
            },
            {
                local: '连指手套(两指手套)',
                raw: 'mittens'
            },
            {
                local: '棒球手套',
                raw: 'baseball_mitt'
            },
            {
                local: '毛边手套',
                raw: 'fur-trimmed_gloves'
            },
            {
                local: '乳胶手套',
                raw: 'latex_gloves'
            },
            {
                local: '蕾丝边手套',
                raw: 'lace-trimmed_gloves'
            },
            {
                local: '皮手套',
                raw: 'leather_gloves'
            },
            {
                local: '花边手套',
                raw: 'frilled_gloves'
            },
            {
                local: '双色手套',
                raw: 'mismatched_gloves'
            },
            {
                local: '多色款手套',
                raw: 'multicolored_gloves'
            },
            {
                local: '不对称的手套',
                raw: 'asymmetrical_gloves'
            },
            {
                local: '棕色手套',
                raw: 'brown_gloves'
            },
            {
                local: '隔热手套',
                raw: 'oven_mitts'
            },
            {
                local: '印花手套',
                raw: 'print_gloves'
            },
            {
                local: '条纹手套',
                raw: 'striped_gloves'
            },
            {
                local: '破损的手套',
                raw: 'torn_gloves'
            }
        ],
        耳饰: [
            {
                local: '十字耳环',
                raw: 'cross_earrings'
            },
            {
                local: '水晶耳环',
                raw: 'crystal_earrings'
            },
            {
                local: '耳环',
                raw: 'earrings'
            },
            {
                local: '花耳环',
                raw: 'flower_earrings'
            },
            {
                local: '心形耳环',
                raw: 'heart_earrings'
            },
            {
                local: '环状耳环',
                raw: 'hoop_earrings'
            },
            {
                local: '多个耳环',
                raw: 'multiple_earrings'
            },
            {
                local: '药丸样式的耳环',
                raw: 'pill_earrings'
            },
            {
                local: '只一边戴着耳环',
                raw: 'single_earring'
            },
            {
                local: '骷髅耳环',
                raw: 'skull_earrings'
            },
            {
                local: '星形耳环',
                raw: 'star_earrings'
            }
        ],
        头饰: [
            {
                local: '光环',
                raw: 'halo'
            },
            {
                local: '机械光环',
                raw: 'mechanical_halo'
            },
            {
                local: '头饰',
                raw: 'headwear'
            },
            {
                local: '头饰',
                raw: 'headpiece'
            },
            {
                local: '头饰已移除',
                raw: 'headwear_removed'
            },
            {
                local: '头花环',
                raw: 'head_wreath'
            },
            {
                local: '皇冠',
                raw: 'crown'
            },
            {
                local: '迷你皇冠',
                raw: 'mini_crown'
            },
            {
                local: '头冠',
                raw: 'tiara'
            },
            {
                local: '同上',
                raw: 'diadem'
            },
            {
                local: '倾斜的头饰',
                raw: 'tilted_headwear'
            },
            {
                local: '头鳍',
                raw: 'head_fins'
            },
            {
                local: '女仆头饰',
                raw: 'maid_headdress'
            },
            {
                local: '新娘头纱',
                raw: 'bridal_veil'
            },
            {
                local: '头带',
                raw: 'headband'
            },
            {
                local: '头盔',
                raw: 'helmet'
            },
            {
                local: '与原设不同的头饰',
                raw: 'alternate_headwear'
            },
            {
                local: '毛边头饰',
                raw: 'fur-trimmed_headwear'
            },
            {
                local: '帽子上的护目镜',
                raw: 'goggles_on_headwear'
            },
            {
                local: '耳机',
                raw: 'earphones'
            },
            {
                local: '耳罩',
                raw: 'earmuffs'
            },
            {
                local: '耳朵穿过头饰',
                raw: 'ears_through_headwear'
            },
            {
                local: 'xx在头上',
                raw: 'xx_on_head'
            },
            {
                local: '头上的叶子',
                raw: 'leaf_on_head'
            },
            {
                local: '纂',
                raw: 'topknot'
            },
            {
                local: '水银头',
                raw: 'suigintou'
            },
            {
                local: '三角头饰',
                raw: 'triangular_headpiece'
            },
            {
                local: '护额',
                raw: 'forehead_protector'
            },
            {
                local: '天线',
                raw: 'radio_antenna'
            },
            {
                local: '兽耳头罩',
                raw: 'animal_hood'
            },
            {
                local: '箭头',
                raw: 'arrow_(symbol)'
            },
            {
                local: '斧头',
                raw: 'axe'
            },
            {
                local: '秃头',
                raw: 'bald'
            },
            {
                local: '头巾',
                raw: 'bandana'
            },
            {
                local: '波波头',
                raw: 'bob_cut'
            },
            {
                local: '骨头',
                raw: 'bone'
            },
            {
                local: '锅盖头',
                raw: 'bowl_cut'
            },
            {
                local: '头冠',
                raw: 'circlet'
            },
            {
                local: '团子头',
                raw: 'double_bun'
            },
            {
                local: '双头假阴茎',
                raw: 'double_dildo'
            },
            {
                local: '钻头',
                raw: 'drill'
            },
            {
                local: '水龙头',
                raw: 'faucet'
            },
            {
                local: '扎头巾(名词)',
                raw: 'hachimaki'
            },
            {
                local: '耳后有头发',
                raw: 'hair_behind_ear'
            },
            {
                local: '头发上系着铃铛',
                raw: 'hair_bell'
            },
            {
                local: '发髻|团子头',
                raw: 'hair_bun'
            },
            {
                local: '披下来的头发',
                raw: 'hair_down'
            },
            {
                local: '在摆动的头发',
                raw: 'hair_flaps'
            },
            {
                local: '拨头发',
                raw: 'hair_flip'
            },
            {
                local: '头发上别着花',
                raw: 'hair_flower'
            },
            {
                local: '散开的头发',
                raw: 'hair_spread_out'
            },
            {
                local: '盘起来的头发',
                raw: 'hair_up'
            },
            {
                local: '戴着头盔的',
                raw: 'helm'
            },
            {
                local: '摘下头盔|被摘下的头盔',
                raw: 'helmet_removed'
            },
            {
                local: '带角头盔',
                raw: 'horned_helmet'
            },
            {
                local: '加帕里馒头',
                raw: 'japari_bun'
            },
            {
                local: '方头巾',
                raw: 'kerchief'
            },
            {
                local: '麻美断头梗',
                raw: 'mami_mogu_mogu'
            },
            {
                local: '头巾式室内女帽',
                raw: 'mob_cap'
            },
            {
                local: '只扎了一边的头发',
                raw: 'one_side_up'
            },
            {
                local: '猫头鹰',
                raw: 'owl'
            },
            {
                local: '突码头',
                raw: 'pier'
            },
            {
                local: '枕头',
                raw: 'pillow'
            },
            {
                local: '举起的拳头',
                raw: 'raised_fist'
            },
            {
                local: '头骨和交叉的骨头',
                raw: 'skull_and_crossbones'
            },
            {
                local: '石头',
                raw: 'stone'
            },
            {
                local: '穆斯林头巾',
                raw: 'turban'
            },
            {
                local: '双钻头发型',
                raw: 'twin_drills'
            },
            {
                local: '头发往上蜷的发型',
                raw: 'updo'
            },
            {
                local: '湿头发',
                raw: 'wet_hair'
            },
            {
                local: '头部穿戴物(偏笼统)',
                raw: 'headdress'
            },
            {
                local: '整理头饰',
                raw: 'adjusting_headwear'
            },
            {
                local: '熊印花头饰',
                raw: 'bear_hair_ornament'
            },
            {
                local: '棕色头饰',
                raw: 'brown_headwear'
            },
            {
                local: '角状头饰',
                raw: 'horned_headwear'
            },
            {
                local: '为角留了洞的头饰',
                raw: 'horns_through_headwear'
            },
            {
                local: '去掉了(原设有的)头饰',
                raw: 'no_headwear'
            },
            {
                local: '头上有非头饰类的物体',
                raw: 'object_on_head'
            },
            {
                local: '印花头饰',
                raw: 'print_headwear'
            },
            {
                local: '骨头状饰品',
                raw: 'bone_hair_ornament'
            },
            {
                local: '兔子饰品',
                raw: 'bunny_hair_ornament'
            },
            {
                local: '角上有饰物',
                raw: 'horn_ornament'
            },
            {
                local: '头上有动物',
                raw: 'animal_on_head'
            },
            {
                local: '从后脑戴上的耳机',
                raw: 'behind-the-head_headphones'
            },
            {
                local: '头上的鸟',
                raw: 'bird_on_head'
            },
            {
                local: '猫耳式耳机',
                raw: 'cat_ear_headphones'
            },
            {
                local: '头上趴着猫',
                raw: 'cat_on_head'
            },
            {
                local: '眼镜别在头上',
                raw: 'eyewear_on_head'
            },
            {
                local: '额头',
                raw: 'forehead'
            },
            {
                local: '额前有宝石',
                raw: 'forehead_jewel'
            },
            {
                local: '亲吻额头',
                raw: 'forehead_kiss'
            },
            {
                local: '额前有图案',
                raw: 'forehead_mark'
            },
            {
                local: '额头贴额头',
                raw: 'forehead-to-forehead'
            },
            {
                local: '头上别着护目镜',
                raw: 'goggles_on_head'
            },
            {
                local: '头',
                raw: 'head'
            },
            {
                local: '头上起包',
                raw: 'head_bump'
            },
            {
                local: '低着头',
                raw: 'head_down'
            },
            {
                local: '戴着头戴显示设备',
                raw: 'head_mounted_display'
            },
            {
                local: '一部分头部没画进框里',
                raw: 'head_out_of_frame'
            },
            {
                local: '枕着头|托着头',
                raw: 'head_rest'
            },
            {
                local: '歪着头',
                raw: 'head_tilt'
            },
            {
                local: '头上有翅膀',
                raw: 'head_wings'
            },
            {
                local: '头部饰品(含一定科幻元素)',
                raw: 'headgear'
            },
            {
                local: '耳机',
                raw: 'headphones'
            },
            {
                local: '状态条(游戏和科幻风格)',
                raw: 'heads-up_display'
            },
            {
                local: '头戴式耳机',
                raw: 'headset'
            },
            {
                local: 'EVA神经连接器',
                raw: 'inter_headset'
            },
            {
                local: '在头上',
                raw: 'on_head'
            },
            {
                local: '小人儿在头上',
                raw: 'person_on_head'
            },
            {
                local: '单侧头上有翅膀',
                raw: 'single_head_wing'
            }
        ],
        帽子: [
            {
                local: '帽子',
                raw: 'hat'
            },
            {
                local: '没有帽子',
                raw: 'no_hat'
            },
            {
                local: '大帽子',
                raw: 'large_hat'
            },
            {
                local: '迷你帽',
                raw: 'mini_hat'
            },
            {
                local: '魔女帽',
                raw: 'witch_hat'
            },
            {
                local: '迷你魔女帽',
                raw: 'mini_witch_hat'
            },
            {
                local: '巫师帽子',
                raw: 'wizard_hat'
            },
            {
                local: '派对帽',
                raw: 'party_hat'
            },
            {
                local: '小丑帽',
                raw: 'jester_cap'
            },
            {
                local: '大礼帽',
                raw: 'tokin_hat'
            },
            {
                local: '高顶礼帽',
                raw: 'top_hat'
            },
            {
                local: '迷你礼帽',
                raw: 'mini_top_hat'
            },
            {
                local: '圆顶礼帽',
                raw: 'bowler_hat'
            },
            {
                local: '药盒帽',
                raw: 'pillbox_hat'
            },
            {
                local: '钟形女帽',
                raw: 'cloche_hat'
            },
            {
                local: '侧边帽',
                raw: 'side_cap'
            },
            {
                local: '军帽',
                raw: 'military_hat'
            },
            {
                local: '贝雷帽',
                raw: 'beret'
            },
            {
                local: '驻军帽',
                raw: 'garrison_cap'
            },
            {
                local: '警察帽',
                raw: 'police_hat'
            },
            {
                local: '护士帽',
                raw: 'nurse_cap'
            },
            {
                local: '厨师帽',
                raw: 'chef_hat'
            },
            {
                local: '校帽',
                raw: 'school_hat'
            },
            {
                local: '海盗帽',
                raw: 'pirate_hat'
            },
            {
                local: '出租车司机帽',
                raw: 'cabbie_hat'
            },
            {
                local: '渔夫帽',
                raw: 'bucket_hat'
            },
            {
                local: '安全帽',
                raw: 'hardhat'
            },
            {
                local: '草帽',
                raw: 'straw_hat'
            },
            {
                local: '太阳帽',
                raw: 'sun_hat'
            },
            {
                local: '斗笠',
                raw: 'rice_hat'
            },
            {
                local: '动物帽',
                raw: 'animal_hat'
            },
            {
                local: '皮帽',
                raw: 'fur_hat'
            },
            {
                local: '带耳朵的帽子',
                raw: 'hat_with_ears'
            },
            {
                local: '泡泡帽',
                raw: 'bobblehat'
            },
            {
                local: '枕帽',
                raw: 'pillow_hat'
            },
            {
                local: '南瓜帽',
                raw: 'pumpkin_hat'
            },
            {
                local: '棒球帽',
                raw: 'baseball_cap'
            },
            {
                local: '鸭舌帽',
                raw: 'flat_cap'
            },
            {
                local: '撕裂的帽子',
                raw: 'torn_hat'
            },
            {
                local: '暴民帽',
                raw: 'mob_cap'
            },
            {
                local: '报童帽',
                raw: 'newsboy_cap'
            },
            {
                local: '白色贝雷帽上的蝴蝶结',
                raw: 'bowknot_over_white_beret'
            },
            {
                local: '反扣的帽子',
                raw: 'backwards_hat'
            },
            {
                local: '碗状帽子',
                raw: 'bowl_hat'
            },
            {
                local: '猫耳帽子',
                raw: 'cat_hat'
            },
            {
                local: '聊天框风格',
                raw: 'chat_log'
            },
            {
                local: '牛仔帽',
                raw: 'cowboy_hat'
            },
            {
                local: '狗盆帽',
                raw: 'dixie_cup_hat'
            },
            {
                local: '带有蝴蝶结的帽子',
                raw: 'hat_bow'
            },
            {
                local: '带有羽毛的帽子',
                raw: 'hat_feather'
            },
            {
                local: '带着花的帽子',
                raw: 'hat_flower'
            },
            {
                local: '带有饰物的帽子',
                raw: 'hat_ornament'
            },
            {
                local: '帽子遮住了一只眼',
                raw: 'hat_over_one_eye'
            },
            {
                local: '帽子被摘下|摘下帽子',
                raw: 'hat_removed'
            },
            {
                local: '带有缎带的帽子',
                raw: 'hat_ribbon'
            },
            {
                local: '捏着帽檐',
                raw: 'hat_tip'
            },
            {
                local: '线影法(纹理)',
                raw: 'hatching_(texture)'
            },
            {
                local: 'cos成初音未来',
                raw: 'hatsune_miku_(cosplay)'
            },
            {
                local: 'so-nanoka(是这样啊的口癖)',
                raw: 'is_that_so'
            },
            {
                local: '道士帽',
                raw: 'porkpie_hat'
            },
            {
                local: '水手帽',
                raw: 'sailor_hat'
            },
            {
                local: '圣诞帽',
                raw: 'santa_hat'
            },
            {
                local: '帽舌划到侧面',
                raw: 'sideways_hat'
            },
            {
                local: '作者犯病',
                raw: 'what'
            },
            {
                local: '另一条世界线',
                raw: 'what_if'
            }
        ],
        发饰: [
            {
                local: '发_带',
                raw: 'hair_ribbon'
            },
            {
                local: '发_带',
                raw: 'hairband'
            },
            {
                local: '发_带',
                raw: 'hair_tie'
            },
            {
                local: '洛丽塔发带',
                raw: 'lolita_hairband'
            },
            {
                local: '褶边发带',
                raw: 'frilled_hairband'
            },
            {
                local: '蕾丝边饰发带',
                raw: 'lace-trimmed_hairband'
            },
            {
                local: '头绳',
                raw: 'hair_bobbles'
            },
            {
                local: '发饰',
                raw: 'hair_ornament'
            },
            {
                local: '发_花',
                raw: 'hair_flower'
            },
            {
                local: 'x_发饰',
                raw: 'x_hair_ornament'
            },
            {
                local: '蝴蝶结发饰',
                raw: 'hair_bow'
            },
            {
                local: '青蛙发饰',
                raw: 'frog_hair_ornament'
            },
            {
                local: '心形发饰',
                raw: 'heart_hair_ornament'
            },
            {
                local: '蝴蝶发饰',
                raw: 'butterfly_hair_ornament'
            },
            {
                local: '星星发饰',
                raw: 'star_hair_ornament'
            },
            {
                local: '食物主题发饰',
                raw: 'food-themed_hair_ornament'
            },
            {
                local: '锚形发饰',
                raw: 'anchor_hair_ornament'
            },
            {
                local: '蝙蝠发饰',
                raw: 'bat_hair_ornament'
            },
            {
                local: '胡萝卜发饰',
                raw: 'carrot_hair_ornament'
            },
            {
                local: '猫系发饰',
                raw: 'cat_hair_ornament'
            },
            {
                local: '三叶草发饰',
                raw: 'clover_hair_ornament'
            },
            {
                local: '月牙发饰',
                raw: 'crescent_hair_ornament'
            },
            {
                local: '十字发饰',
                raw: 'cross_hair_ornament'
            },
            {
                local: '方向键发饰',
                raw: 'd-pad_hair_ornament'
            },
            {
                local: '鱼形发饰',
                raw: 'fish_hair_ornament'
            },
            {
                local: '头发上成对的像无线蓝牙的发饰',
                raw: 'hairpods'
            },
            {
                local: '叶子发饰',
                raw: 'leaf_hair_ornament'
            },
            {
                local: '音符发饰',
                raw: 'musical_note_hair_ornament'
            },
            {
                local: '南瓜发饰',
                raw: 'pumpkin_hair_ornament'
            },
            {
                local: '骷髅发饰',
                raw: 'skull_hair_ornament'
            },
            {
                local: '蛇形发饰|蛙头发饰',
                raw: 'snake_hair_ornament'
            },
            {
                local: '雪花发饰',
                raw: 'snowflake_hair_ornament'
            },
            {
                local: '草莓发饰',
                raw: 'strawberry_hair_ornament'
            },
            {
                local: '向日葵发饰',
                raw: 'sunflower_hair_ornament'
            },
            {
                local: '发夹',
                raw: 'hairpin'
            },
            {
                local: '发_夹',
                raw: 'hairclip'
            },
            {
                local: '发管',
                raw: 'hair_tubes'
            },
            {
                local: '发棒',
                raw: 'hair_stick'
            },
            {
                local: '发髻',
                raw: 'hair_bun'
            },
            {
                local: '发髻(单)',
                raw: 'single_hair_bun'
            },
            {
                local: '发_铃',
                raw: 'hair_bell'
            },
            {
                local: '发_圈',
                raw: 'hair_rings'
            }
        ],
        小装饰: [
            {
                local: '戒指',
                raw: 'ring'
            },
            {
                local: '婚戒',
                raw: 'wedding_band'
            },
            {
                local: '耳环',
                raw: 'earrings'
            },
            {
                local: '单耳环',
                raw: 'single_earring'
            },
            {
                local: '耳钉',
                raw: 'stud_earrings'
            },
            {
                local: '项链',
                raw: 'necklace'
            },
            {
                local: '首饰',
                raw: 'jewelry'
            },
            {
                local: '水晶',
                raw: 'crystal'
            },
            {
                local: '胸针',
                raw: 'brooch'
            },
            {
                local: '宝石',
                raw: 'gem'
            },
            {
                local: '胸前宝石',
                raw: 'chest_jewel'
            },
            {
                local: '额头宝石',
                raw: 'forehead_jewel'
            },
            {
                local: '流苏',
                raw: 'tassel'
            },
            {
                local: '肚链',
                raw: 'belly_chain_'
            },
            {
                local: '花边',
                raw: 'lace'
            },
            {
                local: '丝带',
                raw: 'ribbon'
            },
            {
                local: '缝饰',
                raw: 'stitches'
            },
            {
                local: '围巾',
                raw: 'scarf'
            },
            {
                local: '创可贴',
                raw: 'bandaid'
            },
            {
                local: '项圈',
                raw: 'collar'
            },
            {
                local: '皮带',
                raw: 'belt'
            },
            {
                local: '蒸汽',
                raw: 'steam'
            },
            {
                local: '铃铛',
                raw: 'bell'
            },
            {
                local: '护身符',
                raw: 'amulet'
            },
            {
                local: '徽章',
                raw: 'emblem'
            },
            {
                local: '旗印',
                raw: 'flag_print'
            },
            {
                local: '锚符号',
                raw: 'anchor_symbol'
            },
            {
                local: '十字',
                raw: 'cross'
            },
            {
                local: '衍射十字星',
                raw: 'diffraction_spikes'
            },
            {
                local: '铁十字架',
                raw: 'iron_cross'
            },
            {
                local: '拉丁式十字架',
                raw: 'latin_cross'
            },
            {
                local: '蕾丝边发带',
                raw: 'lace-trimmed_hairband'
            },
            {
                local: '脚踝系带',
                raw: 'ankle_lace-up'
            },
            {
                local: '圣葛罗莉安娜女学园校徽',
                raw: "st._gloriana's_(emblem)"
            },
            {
                local: '舰娘锁(舰C)',
                raw: 'heart_lock_(kantai_collection)'
            },
            {
                local: '袜带',
                raw: 'garters'
            },
            {
                local: '大腿绑带',
                raw: 'thigh_strap'
            },
            {
                local: '大腿缎带',
                raw: 'thigh_ribbon'
            },
            {
                local: '腿环|袜带',
                raw: 'leg_garter'
            },
            {
                local: '吊带袜的吊带',
                raw: 'garter_straps'
            },
            {
                local: '腿锻带',
                raw: 'leg_ribbon'
            },
            {
                local: '腿上的绷带',
                raw: 'bandaid_on_leg'
            },
            {
                local: '包扎过的腿',
                raw: 'bandaged_leg'
            },
            {
                local: '臂环',
                raw: 'arm_garter'
            },
            {
                local: '关节',
                raw: 'joints'
            },
            {
                local: '膝盖',
                raw: 'kneepits'
            },
            {
                local: '护膝',
                raw: 'knee_pads'
            },
            {
                local: '大腿皮套',
                raw: 'thigh_holster'
            },
            {
                local: '膝盖上的创可贴',
                raw: 'bandaid_on_knee'
            }
        ],
        首饰: [
            {
                local: '手链',
                raw: 'bracelet'
            },
            {
                local: '项圈',
                raw: 'choker'
            },
            {
                local: '金属项圈',
                raw: 'metal collar'
            },
            {
                local: '戒指',
                raw: 'ring'
            },
            {
                local: '腕带',
                raw: 'wristband'
            },
            {
                local: '吊坠',
                raw: 'pendant'
            },
            {
                local: '胸针',
                raw: 'brooch'
            },
            {
                local: '圈形耳环',
                raw: 'hoop earrings'
            },
            {
                local: '手镯',
                raw: 'bangle'
            },
            {
                local: '耳钉',
                raw: 'stud earrings'
            },
            {
                local: '旭日形首饰',
                raw: 'sunburst'
            },
            {
                local: '珍珠手链',
                raw: 'pearl bracelet'
            },
            {
                local: '耳坠',
                raw: 'drop earrings'
            },
            {
                local: '木偶戒指',
                raw: 'puppet rings'
            },
            {
                local: '胸花',
                raw: 'corsage'
            },
            {
                local: '蓝宝石胸针',
                raw: 'sapphire brooch'
            },
            {
                local: '珠宝首饰',
                raw: 'jewelry'
            },
            {
                local: '项链',
                raw: 'necklace'
            }
        ]
    },
    表情动作: {
        笑: [
            {
                local: '微笑',
                raw: 'smile'
            },
            {
                local: '大笑',
                raw: 'laughing'
            },
            {
                local: '开心',
                raw: 'kind_smile'
            },
            {
                local: '开心的笑_:D😀',
                raw: ':d'
            },
            {
                local: '眨眼笑_:D',
                raw: ';d'
            },
            {
                local: '露齿咧嘴笑',
                raw: 'grin'
            },
            {
                local: '被逗笑，咧嘴傻笑',
                raw: 'teasing_smile'
            },
            {
                local: '魅惑的微笑',
                raw: 'seductive_smile'
            },
            {
                local: '傻笑,自鸣得意的笑',
                raw: 'smirk'
            },
            {
                local: '咯咯傻笑',
                raw: 'giggling'
            },
            {
                local: '洋洋得意',
                raw: 'smug'
            },
            {
                local: '调皮的脸',
                raw: 'naughty_face'
            },
            {
                local: '邪恶笑',
                raw: 'evil smile'
            },
            {
                local: '疯狂的笑',
                raw: 'crazy_smile'
            },
            {
                local: '快乐|幸福',
                raw: 'happy'
            },
            {
                local: '生日快乐',
                raw: 'happy_birthday'
            },
            {
                local: '万圣节快乐',
                raw: 'happy_halloween'
            },
            {
                local: '新年快乐',
                raw: 'happy_new_year'
            },
            {
                local: '开心的眼泪',
                raw: 'happy_tears'
            },
            {
                local: '情人节快乐',
                raw: 'happy_valentine'
            }
        ],
        哭: [
            {
                local: '伤心',
                raw: 'sad'
            },
            {
                local: '啜泣',
                raw: 'tear'
            },
            {
                local: '大哭',
                raw: 'crying'
            },
            {
                local: '睁着眼睛哭',
                raw: 'crying_with_eyes_open'
            },
            {
                local: '流泪',
                raw: 'streaming_tears'
            },
            {
                local: '泪珠',
                raw: 'teardrop'
            },
            {
                local: '撕破衣服',
                raw: 'tearing_clothes'
            },
            {
                local: '要哭的表情',
                raw: 'tearing_up'
            },
            {
                local: '眼泪',
                raw: 'tears'
            },
            {
                local: '擦眼泪',
                raw: 'wiping_tears'
            },
            {
                local: '心情不好',
                raw: 'badmood'
            }
        ],
        不开心: [
            {
                local: '沮丧',
                raw: 'frustrated'
            },
            {
                local: '沮丧的眉头',
                raw: 'frustrated_brow'
            },
            {
                local: '苦恼的',
                raw: 'annoyed'
            },
            {
                local: '苦闷',
                raw: 'anguish'
            },
            {
                local: '叹气',
                raw: 'sigh'
            },
            {
                local: '忧郁的',
                raw: 'gloom'
            },
            {
                local: '失望的',
                raw: 'disappointed'
            },
            {
                local: '绝望',
                raw: 'despair'
            }
        ],
        蔑视: [
            {
                local: '厌恶(看垃圾一样的眼神)',
                raw: 'disgust'
            },
            {
                local: '轻蔑',
                raw: 'disdain'
            },
            {
                local: '蔑视',
                raw: 'contempt'
            },
            {
                local: '脸上有阴影，配合蔑视',
                raw: 'shaded_face'
            },
            {
                local: '鄙夷的眼神',
                raw: 'jitome'
            },
            {
                local: '皱眉/蹙额',
                raw: 'frown'
            },
            {
                local: '皱眉蹙额(性交前)',
                raw: 'wince'
            },
            {
                local: '眉头紧锁',
                raw: 'furrowed_brow'
            },
            {
                local: '害怕侧目',
                raw: 'fear_kubrick'
            },
            {
                local: '在笑的',
                raw: 'laughing'
            }
        ],
        生气: [
            {
                local: '生气的',
                raw: 'angry'
            },
            {
                local: '怒目而视',
                raw: 'glaring'
            },
            {
                local: '严肃的（和angry有点像）',
                raw: 'serious'
            },
            {
                local: '侧头瞪着你',
                raw: 'kubrick_stare'
            },
            {
                local: '邪恶的',
                raw: 'evil'
            },
            {
                local: '生_闷气',
                raw: 'sulking'
            },
            {
                local: '尖叫|大声喊',
                raw: 'screaming'
            },
            {
                local: '喊叫',
                raw: 'shouting'
            }
        ],
        其他表情: [
            {
                local: '面无表情',
                raw: 'expressionless'
            },
            {
                local: '困乏的',
                raw: 'sleepy'
            },
            {
                local: '喝醉的',
                raw: 'drunk'
            },
            {
                local: '无聊的',
                raw: 'bored'
            },
            {
                local: '使困惑',
                raw: 'confused'
            },
            {
                local: '思考',
                raw: 'thinking'
            },
            {
                local: '孤独',
                raw: 'lonely'
            },
            {
                local: '轻微脸红',
                raw: 'light_blush'
            },
            {
                local: '脸红',
                raw: 'blush'
            },
            {
                local: '害羞的',
                raw: 'shy'
            },
            {
                local: '害羞的(尴尬的)',
                raw: 'embarrass'
            },
            {
                local: '捂脸',
                raw: 'facepalm'
            },
            {
                local: '慌张的',
                raw: 'flustered'
            },
            {
                local: '流汗',
                raw: 'sweat'
            },
            {
                local: '害怕的',
                raw: 'scared'
            },
            {
                local: '阿黑颜',
                raw: 'ahegao'
            },
            {
                local: '忍耐的表情',
                raw: 'endured_face'
            },
            {
                local: '忍耐',
                raw: 'restrained'
            },
            {
                local: '黑化的',
                raw: 'dark_persona'
            },
            {
                local: '疯狂的',
                raw: 'crazy'
            },
            {
                local: '筋疲力尽的',
                raw: 'exhausted'
            },
            {
                local: '傲娇',
                raw: 'Tsundere'
            },
            {
                local: '病娇',
                raw: 'yandere'
            },
            {
                local: '多重人格',
                raw: 'multiple_persona'
            },
            {
                local: '多重人格',
                raw: 'Jekyll_and_Hyde'
            },
            {
                local: '抽搐',
                raw: 'twitching'
            },
            {
                local: '痉挛',
                raw: 'spasm'
            },
            {
                local: '颤抖',
                raw: 'trembling'
            },
            {
                local: '强奸脸',
                raw: 'rape_face'
            },
            {
                local: '翻白眼(高潮眼）',
                raw: 'rolling_eyes'
            },
            {
                local: '嫉妒',
                raw: 'envy'
            },
            {
                local: '绝顶',
                raw: 'female_orgasm'
            },
            {
                local: '重呼吸，可能没用',
                raw: 'heavy_breathing'
            },
            {
                local: '淘气',
                raw: 'naughty'
            },
            {
                local: '表情差分（大概）',
                raw: 'expressions'
            },
            {
                local: '呻吟',
                raw: 'moaning'
            },
            {
                local: '嫌弃的眼神',
                raw: 'scowl'
            }
        ],
        基础动作: [
            {
                local: '站立',
                raw: 'standing'
            },
            {
                local: '躺',
                raw: 'on back'
            },
            {
                local: '趴',
                raw: 'on stomach'
            },
            {
                local: '跪',
                raw: 'kneeling'
            },
            {
                local: '侧卧',
                raw: 'on_side'
            },
            {
                local: '趴着',
                raw: 'on_stomach'
            },
            {
                local: '趴着翘臀',
                raw: 'top-down_bottom-up'
            },
            {
                local: '趴在地上并翘起脚',
                raw: 'the_pose'
            },
            {
                local: '翘臀姿势',
                raw: 'bent_over'
            },
            {
                local: '倒立',
                raw: 'upside-down'
            },
            {
                local: '反转',
                raw: 'reversal'
            },
            {
                local: '战斗姿态',
                raw: 'fighting_stance'
            },
            {
                local: '靠在一边',
                raw: 'leaning_to_the_side'
            },
            {
                local: '倚靠|身体倾斜',
                raw: 'leaning'
            },
            {
                local: '身体往后靠',
                raw: 'leaning_back'
            },
            {
                local: '靠在物体上',
                raw: 'leaning_on_object'
            },
            {
                local: '弓身体',
                raw: 'arched_back'
            },
            {
                local: '身体前倾',
                raw: 'leaning_forward'
            },
            {
                local: '浮(在水上',
                raw: 'afloat'
            },
            {
                local: '躺着的',
                raw: 'lying'
            },
            {
                local: '胎儿姿势(躺)',
                raw: 'fetal_position'
            },
            {
                local: '躺在人身上',
                raw: 'lying_on_person'
            },
            {
                local: '躺在湖面上',
                raw: 'lying_on_the_lake'
            },
            {
                local: '躺在水中',
                raw: 'lying_on_water'
            },
            {
                local: '仰躺',
                raw: 'on_back'
            },
            {
                local: '俯卧后入',
                raw: 'prone_bone'
            },
            {
                local: '斜倒斜躺姿势',
                raw: 'reclining'
            },
            {
                local: '(不躺着)睡觉|直立睡觉',
                raw: 'sleeping_upright'
            },
            {
                local: '展示（后接部位）',
                raw: 'presenting'
            },
            {
                local: '旋转',
                raw: 'spinning'
            },
            {
                local: '摆姿势',
                raw: 'posing'
            },
            {
                local: '时尚姿势',
                raw: 'stylish_pose'
            },
            {
                local: '公然猥亵',
                raw: 'public_indecency'
            },
            {
                local: '模仿',
                raw: 'parody'
            },
            {
                local: '在容器中',
                raw: 'in_container'
            },
            {
                local: '挤压玻璃(无效)',
                raw: 'against_glass'
            },
            {
                local: '瞄准',
                raw: 'aiming'
            },
            {
                local: '瞄准了读者(的视角)',
                raw: 'aiming_at_viewer'
            },
            {
                local: '化妆',
                raw: 'applying_makeup'
            },
            {
                local: '洗澡',
                raw: 'bathing'
            },
            {
                local: '咬',
                raw: 'biting'
            },
            {
                local: '出血',
                raw: 'bleeding'
            },
            {
                local: '吹',
                raw: 'blowing'
            },
            {
                local: '鞠躬',
                raw: 'bowing'
            },
            {
                local: '喷火',
                raw: 'breathing_fire'
            },
            {
                local: '骑扫帚',
                raw: 'broom_riding'
            },
            {
                local: '刷牙',
                raw: 'brushing_teeth'
            },
            {
                local: '吹泡泡',
                raw: 'bubble_blowing'
            },
            {
                local: '欺负',
                raw: 'bullying'
            },
            {
                local: '燃烧',
                raw: 'burning'
            },
            {
                local: '投掷',
                raw: 'cast'
            },
            {
                local: '追逐',
                raw: 'chasing'
            },
            {
                local: '打扫',
                raw: 'cleaning'
            },
            {
                local: '攀爬',
                raw: 'climbing'
            },
            {
                local: '安慰',
                raw: 'comforting'
            },
            {
                local: '烹饪',
                raw: 'cooking'
            },
            {
                local: '哭',
                raw: 'crying'
            },
            {
                local: '拥抱',
                raw: 'cuddling'
            },
            {
                local: '跳舞',
                raw: 'dancing'
            },
            {
                local: '潜水',
                raw: 'diving'
            },
            {
                local: '拖某物',
                raw: 'dragging'
            },
            {
                local: '绘画',
                raw: 'drawing'
            },
            {
                local: '拉弓',
                raw: 'drawing_bow'
            },
            {
                local: '做梦',
                raw: 'dreaming'
            },
            {
                local: '喝',
                raw: 'drinking'
            },
            {
                local: '驾驶',
                raw: 'driving'
            },
            {
                local: '(意外)掉落',
                raw: 'dropping'
            },
            {
                local: '弄干(浴后)',
                raw: 'drying'
            },
            {
                local: '双持',
                raw: 'dual_wielding'
            },
            {
                local: '做运动',
                raw: 'exercise'
            },
            {
                local: '战斗中的',
                raw: 'fighting'
            },
            {
                local: '射击',
                raw: 'firing'
            },
            {
                local: '钓鱼',
                raw: 'fishing'
            },
            {
                local: '拍打动作',
                raw: 'flapping'
            },
            {
                local: '露出',
                raw: 'flashing'
            },
            {
                local: '在逃跑的',
                raw: 'fleeing'
            },
            {
                local: '秀肌肉',
                raw: 'flexing'
            },
            {
                local: '飞行',
                raw: 'flying'
            },
            {
                local: '飞踢',
                raw: 'flying_kick'
            },
            {
                local: '梳头',
                raw: 'hair_brushing'
            },
            {
                local: '撩头发',
                raw: 'hair_tucking'
            },
            {
                local: '吊起来的',
                raw: 'hanging'
            },
            {
                local: '击打',
                raw: 'hitting'
            },
            {
                local: '在想象的',
                raw: 'imagining'
            },
            {
                local: '跳跃',
                raw: 'jumping'
            },
            {
                local: '踢',
                raw: 'kicking'
            },
            {
                local: '舔',
                raw: 'licking'
            },
            {
                local: '舔嘴唇',
                raw: 'licking_lips'
            },
            {
                local: '咬嘴唇',
                raw: 'lip_biting'
            },
            {
                local: '冥想',
                raw: 'meditation'
            },
            {
                local: '绘画',
                raw: 'painting'
            },
            {
                local: '画画',
                raw: 'Painting_(Action)'
            },
            {
                local: '扑克牌',
                raw: 'playing_card'
            },
            {
                local: '打游戏',
                raw: 'playing_games'
            },
            {
                local: '演奏乐器',
                raw: 'playing_instrument'
            },
            {
                local: '钢管舞',
                raw: 'pole_dancing'
            },
            {
                local: '祈祷',
                raw: 'praying'
            },
            {
                local: '挥拳',
                raw: 'punching'
            },
            {
                local: '推搡',
                raw: 'pushing'
            },
            {
                local: '用手扶着',
                raw: 'railing'
            },
            {
                local: '阅读',
                raw: 'reading'
            },
            {
                local: '骑',
                raw: 'riding'
            },
            {
                local: '奔跑',
                raw: 'running'
            },
            {
                local: '缝纫',
                raw: 'sewing'
            },
            {
                local: '购物',
                raw: 'shopping'
            },
            {
                local: '淋浴',
                raw: 'showering'
            },
            {
                local: '唱歌',
                raw: 'sing'
            },
            {
                local: '唱歌',
                raw: 'singing'
            },
            {
                local: '砍',
                raw: 'slashing'
            },
            {
                local: '睡觉',
                raw: 'sleeping'
            },
            {
                local: '闻',
                raw: 'smelling'
            },
            {
                local: '抽烟',
                raw: 'smoking'
            },
            {
                local: '打喷嚏',
                raw: 'sneezing'
            },
            {
                local: '下雪',
                raw: 'snowing'
            },
            {
                local: '泡脚',
                raw: 'soaking_feet'
            },
            {
                local: '足球运动',
                raw: 'soccer'
            },
            {
                local: '从容器中倒出液体的动作',
                raw: 'spilling'
            },
            {
                local: '从嘴里吐出液体的动作',
                raw: 'spitting'
            },
            {
                local: '飞溅',
                raw: 'splashing'
            },
            {
                local: '站在水上或液体上',
                raw: 'standing_on_liquid'
            },
            {
                local: '单腿站立',
                raw: 'standing_on_one_leg'
            },
            {
                local: '站立劈叉|站立高抬腿',
                raw: 'standing_split'
            },
            {
                local: '指尖抵着指间',
                raw: 'steepled_fingers'
            },
            {
                local: '绞首',
                raw: 'strangling'
            },
            {
                local: '打扫',
                raw: 'sweeping'
            },
            {
                local: '游泳',
                raw: 'swimming'
            },
            {
                local: '摆动',
                raw: 'swing'
            },
            {
                local: '摇尾巴',
                raw: 'tail_wagging'
            },
            {
                local: '拍照|自拍',
                raw: 'taking_picture'
            },
            {
                local: '有台词的',
                raw: 'talking'
            },
            {
                local: '打电话',
                raw: 'talking_on_phone'
            },
            {
                local: '戏弄',
                raw: 'teasing'
            },
            {
                local: '思考',
                raw: 'thinking'
            },
            {
                local: '挠痒痒',
                raw: 'tickling'
            },
            {
                local: '上厕所',
                raw: 'toilet_use'
            },
            {
                local: '投掷',
                raw: 'tossing_'
            },
            {
                local: '被绊倒',
                raw: 'tripping'
            },
            {
                local: '恶搞行为',
                raw: 'trolling'
            },
            {
                local: '抽搐',
                raw: 'twitching'
            },
            {
                local: '打结(动作)',
                raw: 'tying'
            },
            {
                local: '拔出鞘的',
                raw: 'unsheathing'
            },
            {
                local: '解开的',
                raw: 'untying'
            },
            {
                local: '拉开拉链(动作)',
                raw: 'unzipping'
            },
            {
                local: '涉水',
                raw: 'wading'
            },
            {
                local: '醒来',
                raw: 'waking_up'
            },
            {
                local: '走路',
                raw: 'walking'
            },
            {
                local: '在液体上行走',
                raw: 'walking_on_liquid'
            },
            {
                local: '洗涤',
                raw: 'washing'
            },
            {
                local: '讲悄悄话',
                raw: 'whispering'
            },
            {
                local: '摔角(运动)',
                raw: 'wrestling'
            },
            {
                local: '写作',
                raw: 'writing'
            },
            {
                local: '打哈欠',
                raw: 'yawning'
            },
            {
                local: '躲藏',
                raw: 'hiding'
            }
        ],
        手部动作: [
            {
                local: '手放在身后',
                raw: 'arms_behind_back'
            },
            {
                local: '手在头上',
                raw: 'arm_above_head'
            },
            {
                local: '手放头后',
                raw: 'arm_behind_head'
            },
            {
                local: '手交叉于胸前',
                raw: 'arms_crossed'
            },
            {
                local: '用手支撑住',
                raw: 'arm_support'
            },
            {
                local: '露腋',
                raw: 'armpits'
            },
            {
                local: '抬手',
                raw: 'arms_up'
            },
            {
                local: '双手叉腰',
                raw: 'hands_on_hips'
            },
            {
                local: '单手搂腰',
                raw: 'arm_around_waist'
            },
            {
                local: '某著名伸手扭腰动作',
                raw: 'caramelldansen'
            },
            {
                local: '双手反袖',
                raw: 'hands_in_opposite_sleeves'
            },
            {
                local: '招手',
                raw: 'waving'
            },
            {
                local: '交叉双臂',
                raw: 'crossed_arms'
            },
            {
                local: '伸出双臂',
                raw: 'outstretched_arms'
            },
            {
                local: '双臂摆出V',
                raw: 'v_arms'
            },
            {
                local: '双臂摆出W',
                raw: 'w_arms'
            },
            {
                local: '敬礼',
                raw: 'salute'
            },
            {
                local: '(有目的地)伸手',
                raw: 'reaching'
            },
            {
                local: '朝画外伸手',
                raw: 'reaching_out'
            },
            {
                local: '伸懒腰',
                raw: 'stretch'
            },
            {
                local: '拥抱自己的腿',
                raw: 'hugging_own_legs'
            },
            {
                local: '手臂刀刃',
                raw: 'arm_blade'
            },
            {
                local: '抓住手臂',
                raw: 'arm_grab'
            },
            {
                local: '手臂往后拉',
                raw: 'arm_held_back'
            },
            {
                local: '手臂丝带',
                raw: 'arm_ribbon'
            },
            {
                local: '缠着绷带的手臂',
                raw: 'bandaged_arm'
            },
            {
                local: '手臂上贴着创可贴',
                raw: 'bandaid_on_arm'
            },
            {
                local: '手臂被束缚',
                raw: 'bound_arms'
            },
            {
                local: '遮住关键部位的手臂',
                raw: 'convenient_arm'
            },
            {
                local: '多只手臂',
                raw: 'extra_arms'
            },
            {
                local: '互挽手臂',
                raw: 'locked_arms'
            },
            {
                local: '伸出手臂',
                raw: 'outstretched_arm'
            },
            {
                local: '挥舞着手臂',
                raw: 'waving_arms'
            },
            {
                local: '单手垂放',
                raw: 'arm_at_side'
            },
            {
                local: '单手背到身后',
                raw: 'arm_behind_back'
            },
            {
                local: '单手托在脑后',
                raw: 'shou'
            },
            {
                local: '手炮',
                raw: 'arm_cannon'
            },
            {
                local: '挽手',
                raw: 'arm_hug'
            },
            {
                local: '举着手',
                raw: 'arm_up'
            },
            {
                local: '双手垂放',
                raw: 'arms_at_sides'
            },
            {
                local: '双手抱头',
                raw: 'arms_behind_head'
            },
            {
                local: '手放在嘴边',
                raw: 'hand_to_mouth'
            },
            {
                local: '嘘手势',
                raw: 'shushing'
            },
            {
                local: '猫爪手势',
                raw: 'cat_pose'
            },
            {
                local: '爪手势',
                raw: 'claw_pose'
            },
            {
                local: '招财猫手势(下弯手腕)',
                raw: 'paw_pose'
            },
            {
                local: '狐狸手势',
                raw: 'fox_shadow_puppet'
            },
            {
                local: 'b',
                raw: 'double_fox_shadow_puppet'
            },
            {
                local: '手指枪手势',
                raw: 'finger_gun'
            },
            {
                local: '胜利手势',
                raw: 'v'
            },
            {
                local: '双_v',
                raw: 'double_v'
            },
            {
                local: '翘大拇指',
                raw: 'thumbs_up'
            },
            {
                local: '食指抬起',
                raw: 'index_finger_raised'
            },
            {
                local: '国际友好手势',
                raw: 'middle_finger'
            },
            {
                local: '做鬼脸',
                raw: 'grimace'
            },
            {
                local: '做鬼脸',
                raw: 'eyelid_pull'
            },
            {
                local: '用手指做出笑脸',
                raw: 'fingersmile'
            },
            {
                local: '擦眼泪',
                raw: 'wiping_tears'
            },
            {
                local: '准备扣扳机的手势',
                raw: 'finger_on_trigger'
            },
            {
                local: '指着自己',
                raw: 'pointing_at_self'
            },
            {
                local: '指向看图的人',
                raw: 'pointing_at_viewer'
            },
            {
                local: '向上指',
                raw: 'pointing_up'
            },
            {
                local: '戳',
                raw: 'poking'
            },
            {
                local: '做手势',
                raw: 'hand_gesture'
            },
            {
                local: 'OK手势',
                raw: 'ok_sign'
            },
            {
                local: '遮阳手势',
                raw: 'shading_eyes'
            },
            {
                local: '咬手指',
                raw: 'finger_biting'
            },
            {
                local: '吮吸手指',
                raw: 'finger_in_mouth'
            },
            {
                local: '手指',
                raw: 'fingering_through_clothes'
            },
            {
                local: '手指并拢',
                raw: 'fingers_together'
            },
            {
                local: '手指卷着头发',
                raw: 'hair_twirling'
            },
            {
                local: '双手手指交叉|双手紧握',
                raw: 'hands_clasped'
            },
            {
                local: '握着头发|手指绕着头发',
                raw: 'holding_hair'
            },
            {
                local: '用手指着',
                raw: 'pointing'
            },
            {
                local: '锐利的手指甲',
                raw: 'sharp_fingernails'
            },
            {
                local: '袖子长过手指',
                raw: 'sleeves_past_fingers'
            },
            {
                local: '张开手指',
                raw: 'spread_fingers'
            },
            {
                local: '手指没放在扳机上',
                raw: 'trigger_discipline'
            },
            {
                local: '手指比W',
                raw: 'w'
            },
            {
                local: '(保持)平衡的姿势',
                raw: 'balancing'
            },
            {
                local: '展现魅力的姿势',
                raw: 'curvy'
            },
            {
                local: '多角度|多姿势',
                raw: 'multiple_views'
            },
            {
                local: '姿势',
                raw: 'pose'
            },
            {
                local: '准备拔刀的姿势',
                raw: 'ready_to_draw'
            },
            {
                local: '一种女性展示臀部的姿势',
                raw: 'trefoil'
            },
            {
                local: '僵尸姿势',
                raw: 'zombie_pose'
            },
            {
                local: '招手',
                raw: 'beckoning'
            },
            {
                local: '手持辫子',
                raw: 'bunching_hair'
            },
            {
                local: '抱起',
                raw: 'carrying'
            },
            {
                local: '肩扛',
                raw: 'carrying_over_shoulder'
            },
            {
                local: '夹在腋下',
                raw: 'carrying_under_arm'
            },
            {
                local: '助威',
                raw: 'cheering'
            },
            {
                local: '手抵在嘴唇边',
                raw: 'finger_to_mouth'
            },
            {
                local: '捏脸颊',
                raw: 'cheek_pinching'
            },
            {
                local: '戳脸颊',
                raw: 'cheek_poking'
            },
            {
                local: '摸下巴',
                raw: 'chin_stroking'
            },
            {
                local: '拉头发',
                raw: 'hair_pull'
            },
            {
                local: '遮盖嘴',
                raw: 'covering_mouth'
            },
            {
                local: '遮盖xx',
                raw: 'covering_xx'
            },
            {
                local: '自我抚摸',
                raw: 'self_fondle'
            },
            {
                local: '调整过膝袜',
                raw: 'adjusting_thighhigh'
            },
            {
                local: '托脸颊',
                raw: 'chin_rest'
            },
            {
                local: '托头',
                raw: 'head_rest'
            },
            {
                local: '拿着',
                raw: 'take'
            },
            {
                local: '抓床单',
                raw: '_sheet_grab'
            },
            {
                local: '摸索',
                raw: 'groping'
            },
            {
                local: '掀裙子',
                raw: 'skirt_lift'
            },
            {
                local: '手抓裆部',
                raw: 'crotch_grab'
            },
            {
                local: '用手遮住胸部',
                raw: 'covering_chest_by_hand'
            },
            {
                local: '掀起的刘海',
                raw: 'bangs_pinned_back'
            },
            {
                local: '掀起衣物',
                raw: 'clothes_lift'
            },
            {
                local: '掀起裙子',
                raw: 'dress_lift'
            },
            {
                local: '掀起和服',
                raw: 'kimono_lift'
            },
            {
                local: '被对方掀起衣物',
                raw: 'lifted_by_another'
            },
            {
                local: '掀起自己的衣物',
                raw: 'lifted_by_self'
            },
            {
                local: '拉起掀起卷起衬衫',
                raw: 'shirt_lift'
            },
            {
                local: '指掀起裙子时形成的篮子形状',
                raw: 'skirt_basket'
            },
            {
                local: '被掀起裙子(含突发情况意义)',
                raw: 'skirt_flip'
            },
            {
                local: '往上剥开的比基尼',
                raw: 'bikini_lift'
            },
            {
                local: '单腿抬高',
                raw: 'leg_lift'
            },
            {
                local: '将人抱起',
                raw: 'lifting_person'
            },
            {
                local: '往上掰衣物的吊带',
                raw: 'strap_lift'
            },
            {
                local: '起风效果|上升气流',
                raw: 'wind_lift'
            },
            {
                local: '扯着比基尼',
                raw: 'bikini_pull'
            },
            {
                local: '扯脸颊',
                raw: 'cheek_pull'
            },
            {
                local: '拉开衣物',
                raw: 'clothes_pull'
            },
            {
                local: '剥下裙子胸口的部分',
                raw: 'dress_pull'
            },
            {
                local: '头发往后扎',
                raw: 'hair_pulled_back'
            },
            {
                local: '剥开和服',
                raw: 'kimono_pull'
            },
            {
                local: '剥开连衣裤',
                raw: 'leotard_pull'
            },
            {
                local: '拉着口罩',
                raw: 'mask_pull'
            },
            {
                local: '拉着裤子',
                raw: 'pants_pull'
            },
            {
                local: '被另一个人拉(或拉衣物)',
                raw: 'pulled_by_another'
            },
            {
                local: '拉下自己的衣物',
                raw: 'pulled_by_self'
            },
            {
                local: '拉',
                raw: 'pulling'
            },
            {
                local: '拉开衬衫',
                raw: 'shirt_pull'
            },
            {
                local: '褪下短裤',
                raw: 'shorts_pull'
            },
            {
                local: '拉开裙子',
                raw: 'skirt_pull'
            },
            {
                local: '扯下泳衣',
                raw: 'swimsuit_pull'
            },
            {
                local: '拉链的拉片',
                raw: 'zipper_pull_tab'
            },
            {
                local: '拨弄衣服',
                raw: 'adjusting_clothes'
            },
            {
                local: '扶眼镜',
                raw: 'adjusting_eyewear'
            },
            {
                local: '拨弄手套',
                raw: 'adjusting_gloves'
            },
            {
                local: '理头发',
                raw: 'adjusting_hair'
            },
            {
                local: '整理帽子',
                raw: 'adjusting_hat'
            },
            {
                local: '拨弄泳衣',
                raw: 'adjusting_swimsuit'
            }
        ],
        '手部动作(拿着某物)': [
            {
                local: '拿着某物',
                raw: 'holding'
            },
            {
                local: '抱着动物',
                raw: 'holding_animal'
            },
            {
                local: '拉着弓',
                raw: 'holding_arrow'
            },
            {
                local: '握着斧头',
                raw: 'holding_axe'
            },
            {
                local: '提着包',
                raw: 'holding_bag'
            },
            {
                local: '抱着球',
                raw: 'holding_ball'
            },
            {
                local: '提着篮子',
                raw: 'holding_basket'
            },
            {
                local: '捧着书',
                raw: 'holding_book'
            },
            {
                local: '拿着瓶子',
                raw: 'holding_bottle'
            },
            {
                local: '手捧花束',
                raw: 'holding_bouquet'
            },
            {
                local: '拿着弓(武器)',
                raw: 'holding_bow_(weapon)'
            },
            {
                local: '端着碗',
                raw: 'holding_bowl'
            },
            {
                local: '端着箱子',
                raw: 'holding_box'
            },
            {
                local: '憋气',
                raw: 'holding_breath'
            },
            {
                local: '手持扫帚',
                raw: 'holding_broom'
            },
            {
                local: '手持摄像机',
                raw: 'holding_camera'
            },
            {
                local: '拿着易拉罐',
                raw: 'holding_can'
            },
            {
                local: '手持糖果',
                raw: 'holding_candy'
            },
            {
                local: '手持卡片',
                raw: 'holding_card'
            },
            {
                local: '抱着猫',
                raw: 'holding_cat'
            },
            {
                local: '拿着筷子',
                raw: 'holding_chopsticks'
            },
            {
                local: '手叼香烟',
                raw: 'holding_cigarette'
            },
            {
                local: '拿着衣服',
                raw: 'holding_clothes'
            },
            {
                local: '拿着避孕套',
                raw: 'holding_condom'
            },
            {
                local: '手持杯子',
                raw: 'holding_cup'
            },
            {
                local: '手持匕首',
                raw: 'holding_dagger'
            },
            {
                local: '抱着玩偶',
                raw: 'holding_doll'
            },
            {
                local: '拿着眼镜|正在摘眼镜',
                raw: 'holding_eyewear'
            },
            {
                local: '拿着扇子',
                raw: 'holding_fan'
            },
            {
                local: '手持旗帜',
                raw: 'holding_flag'
            },
            {
                local: '拿着花',
                raw: 'holding_flower'
            },
            {
                local: '拿着食物',
                raw: 'holding_food'
            },
            {
                local: '拿着餐叉',
                raw: 'holding_fork'
            },
            {
                local: '拿着水果',
                raw: 'holding_fruit'
            },
            {
                local: '拿着礼物',
                raw: 'holding_gift'
            },
            {
                local: '拿着枪',
                raw: 'holding_gun'
            },
            {
                local: '牵手',
                raw: 'holding_hands'
            },
            {
                local: '拿着帽子',
                raw: 'holding_hat'
            },
            {
                local: '手里捧着头',
                raw: 'holding_head'
            },
            {
                local: '拿着头盔',
                raw: 'holding_helmet'
            },
            {
                local: '拿着泳圈',
                raw: 'holding_innertube'
            },
            {
                local: '拿着乐器',
                raw: 'holding_instrument'
            },
            {
                local: '拿着刀',
                raw: 'holding_knife'
            },
            {
                local: '拿着叶子',
                raw: 'holding_leaf'
            },
            {
                local: '拿着棒棒糖',
                raw: 'holding_lollipop'
            },
            {
                local: '拿着面具',
                raw: 'holding_mask'
            },
            {
                local: '拿着麦克风',
                raw: 'holding_microphone'
            },
            {
                local: '拿着缝衣针',
                raw: 'holding_needle'
            },
            {
                local: '握着自己的脚',
                raw: 'holding_own_foot'
            },
            {
                local: '手握画笔',
                raw: 'holding_paintbrush'
            },
            {
                local: '拿着纸',
                raw: 'holding_paper'
            },
            {
                local: '握笔',
                raw: 'holding_pen'
            },
            {
                local: '手持铅笔',
                raw: 'holding_pencil'
            },
            {
                local: '拿着手机',
                raw: 'holding_phone'
            },
            {
                local: '抱着枕头',
                raw: 'holding_pillow'
            },
            {
                local: '拿着烟斗',
                raw: 'holding_pipe'
            },
            {
                local: '拿着披萨',
                raw: 'holding_pizza'
            },
            {
                local: '端着碟子',
                raw: 'holding_plate'
            },
            {
                local: '拿着精灵球',
                raw: 'holding_poke_ball'
            },
            {
                local: '抱着宝可梦',
                raw: 'holding_pokemon'
            },
            {
                local: '手持长柄武器',
                raw: 'holding_polearm'
            },
            {
                local: '拎着包袱',
                raw: 'holding_sack'
            },
            {
                local: '手持镰刀',
                raw: 'holding_scythe'
            },
            {
                local: '握着刀鞘',
                raw: 'holding_sheath'
            },
            {
                local: '手持盾牌',
                raw: 'holding_shield'
            },
            {
                local: '拿着鞋子',
                raw: 'holding_shoes'
            },
            {
                local: '手持招牌',
                raw: 'holding_sign'
            },
            {
                local: '手持长矛',
                raw: 'holding_spear'
            },
            {
                local: '拿着汤勺',
                raw: 'holding_spoon'
            },
            {
                local: '手持法杖',
                raw: 'holding_staff'
            },
            {
                local: '手拉着吊带',
                raw: 'holding_strap'
            },
            {
                local: '抱着毛绒玩具',
                raw: 'holding_stuffed_animal'
            },
            {
                local: '手持手写笔',
                raw: 'holding_stylus'
            },
            {
                local: '手持剑',
                raw: 'holding_sword'
            },
            {
                local: '手持注射器',
                raw: 'holding_syringe'
            },
            {
                local: '拿着毛巾',
                raw: 'holding_towel'
            },
            {
                local: '托着盘子',
                raw: 'holding_tray'
            },
            {
                local: '撑伞',
                raw: 'holding_umbrella'
            },
            {
                local: '握着棒子',
                raw: 'holding_wand'
            },
            {
                local: '握着鞭子',
                raw: 'holding_whip'
            },
            {
                local: '单手搂着脖子',
                raw: 'arm_around_neck'
            },
            {
                local: '双手搂着脖子',
                raw: 'arms_around_neck'
            }
        ],
        '手部动作(放在某地)': [
            {
                local: '遮盖的动作',
                raw: 'covering'
            },
            {
                local: '挡住脸',
                raw: 'covering_face'
            },
            {
                local: '遮着臀部',
                raw: 'covering_ass'
            },
            {
                local: '遮着裆部',
                raw: 'covering_crotch'
            },
            {
                local: '遮住眼睛',
                raw: 'covering_eyes'
            },
            {
                local: '挡住嘴巴',
                raw: 'covering_mouth'
            },
            {
                local: '挡住乳头',
                raw: 'covering_nipples'
            },
            {
                local: '双手放在别人的脸上',
                raw: "hands_on_another's_"
            },
            {
                local: '双手放在对方的脸颊上',
                raw: "hands_on_another's_cheeks"
            },
            {
                local: '双手放在屁股上',
                raw: 'hands_on_ass'
            },
            {
                local: '双手放在脚上',
                raw: 'hands_on_feet'
            },
            {
                local: '双手碰到头上的饰物',
                raw: 'hands_on_headwear'
            },
            {
                local: '双手搭在刀柄上',
                raw: 'hands_on_hilt'
            },
            {
                local: '双手放在两腿之间',
                raw: 'hands_on_lap'
            },
            {
                local: '双手放在自己的脸上',
                raw: 'hands_on_own_face'
            },
            {
                local: '双手放在自己的脸颊上',
                raw: 'hands_on_own_cheeks'
            },
            {
                local: '双手放在自己的胸口',
                raw: 'hands_on_own_chest'
            },
            {
                local: '双手放在自己的头上',
                raw: 'hands_on_own_head'
            },
            {
                local: '双手放在自己的膝盖上',
                raw: 'hands_on_own_knees'
            },
            {
                local: '双手放在自己的肚子上',
                raw: 'hands_on_own_stomach'
            },
            {
                local: '双手放在自己的大腿上',
                raw: 'hands_on_own_thighs'
            },
            {
                local: '双手放在别人的肩膀上',
                raw: "hands_on_another's_shoulders"
            },
            {
                local: '双手叉腰|双手搁在腰上',
                raw: 'hands_on_hips'
            },
            {
                local: '手接触到对方的脸',
                raw: "hand_on_another's_"
            },
            {
                local: '手摸着对方的脸颊',
                raw: "hand_on_another's_cheek"
            },
            {
                local: '手放在对方的胸前',
                raw: "hand_on_another's_chest"
            },
            {
                local: '手托着对方的下巴',
                raw: "hand_on_another's_chin"
            },
            {
                local: '手放在对方的头上',
                raw: "hand_on_another's_head"
            },
            {
                local: '手放在对方的肩上',
                raw: "hand_on_another's_shoulder"
            },
            {
                local: '手放在对方的肚子上',
                raw: "hand_on_another's_stomach"
            },
            {
                local: '手放在屁股上',
                raw: 'hand_on_ass'
            },
            {
                local: '手放在头上',
                raw: 'hand_on_head'
            },
            {
                local: '手触碰帽子',
                raw: 'hand_on_headwear'
            },
            {
                local: '手搁在刀柄上',
                raw: 'hand_on_hilt'
            },
            {
                local: '手叉着腰|手搁在腰上',
                raw: 'hand_on_hip'
            },
            {
                local: '把手放在自己脸上',
                raw: 'hand_on_own_'
            },
            {
                local: '把手放在自己的脸颊上',
                raw: 'hand_on_own_cheek'
            },
            {
                local: '把手放在自己的胸口',
                raw: 'hand_on_own_chest'
            },
            {
                local: '手碰着自己的下巴',
                raw: 'hand_on_own_chin'
            },
            {
                local: '把手放在自己的肚子上',
                raw: 'hand_on_own_stomach'
            },
            {
                local: '手放在肩上',
                raw: 'hand_on_shoulder'
            },
            {
                local: '手放在对方的头发上',
                raw: "hand_in_another's_hair"
            },
            {
                local: '手埋在头发里',
                raw: 'hand_in_hair'
            },
            {
                local: '手插在口袋里',
                raw: 'hand_in_pocket'
            }
        ],
        '手部动作(抓着某物)': [
            {
                local: '抓着屁股',
                raw: 'ass_grab'
            },
            {
                local: '抓着贫乳',
                raw: 'flat_chest_grab'
            },
            {
                local: '抓住|抓着',
                raw: 'grabbing'
            },
            {
                local: '抓着对方屁股',
                raw: "grabbing_another's_ass"
            },
            {
                local: '抓着对方的头发',
                raw: "grabbing_another's_hair"
            },
            {
                local: '从背后揉胸|从背后抓住胸部',
                raw: 'grabbing_from_behind'
            },
            {
                local: '抓着自己的屁股',
                raw: 'grabbing_own_ass'
            },
            {
                local: '抓住男性器插入自己',
                raw: 'guided_penetration'
            },
            {
                local: '抓着头发',
                raw: 'hair_grab'
            },
            {
                local: '抓着腿',
                raw: 'leg_grab'
            },
            {
                local: '抓着领带',
                raw: 'necktie_grab'
            },
            {
                local: '抓着颈部的衣服',
                raw: 'neckwear_grab'
            },
            {
                local: '抓着阴茎',
                raw: 'penis_grab'
            },
            {
                local: '抓着枕头',
                raw: 'pillow_grab'
            },
            {
                local: '抓着床单',
                raw: 'sheet_grab'
            },
            {
                local: '抓着尾巴',
                raw: 'tail_grab'
            },
            {
                local: '抓着大腿',
                raw: 'thigh_grab'
            },
            {
                local: '抓着躯干',
                raw: 'torso_grab'
            },
            {
                local: '抓着手腕',
                raw: 'wrist_grab'
            }
        ],
        腿部动作: [
            {
                local: '抬一只腿',
                raw: 'legs_up'
            },
            {
                local: '张腿',
                raw: 'spread legs'
            },
            {
                local: '两腿并拢',
                raw: 'legs_together'
            },
            {
                local: '二郎腿',
                raw: 'crossed_legs'
            },
            {
                local: 'M字摆腿',
                raw: 'm_legs'
            },
            {
                local: 'M字摆腿',
                raw: 'standing_split,_leg_up'
            },
            {
                local: '屈膝礼（女仆行礼）',
                raw: 'curtsy'
            },
            {
                local: '双腿之间的手',
                raw: 'hand_between_legs'
            },
            {
                local: '稍息',
                raw: 'open_stance'
            },
            {
                local: '挡住关键部位的腿',
                raw: 'convenient_leg'
            },
            {
                local: '用双腿夹住',
                raw: 'leg_lock'
            },
            {
                local: '双腿',
                raw: 'legs'
            },
            {
                local: '双腿抬过头',
                raw: 'legs_over_head'
            },
            {
                local: '蹲下分开双腿',
                raw: 'squatting,_open_legs'
            },
            {
                local: '膝盖合并，两脚分开',
                raw: 'knees_together_feet_apart'
            },
            {
                local: '膝盖上有动物',
                raw: 'animal_on_lap'
            },
            {
                local: '手放在自己的膝盖上',
                raw: 'hand_on_own_knee'
            },
            {
                local: '顶起膝盖',
                raw: 'knee_up'
            },
            {
                local: '膝盖',
                raw: 'knees'
            },
            {
                local: '膝盖顶到胸部',
                raw: 'knees_to_chest'
            },
            {
                local: '在膝盖上',
                raw: 'on_lap'
            },
            {
                local: '坐',
                raw: 'sitting'
            },
            {
                local: '鸭子坐',
                raw: 'wariza'
            },
            {
                local: '跨坐',
                raw: 'straddling'
            },
            {
                local: '侧身坐',
                raw: 'yokozuwari'
            },
            {
                local: '向后坐',
                raw: 'sitting_backwards'
            },
            {
                local: '坐在树上',
                raw: 'sitting_in_tree'
            },
            {
                local: '坐在物体上',
                raw: 'sitting_on_xx'
            },
            {
                local: '蝴蝶坐',
                raw: 'butterfly_sitting'
            },
            {
                local: '坐在桌子上',
                raw: 'lotus_position'
            },
            {
                local: '坐在栏杆上',
                raw: 'sitting_on_railing'
            },
            {
                local: '坐在石头',
                raw: 'sitting_on_rock'
            },
            {
                local: '坐在楼梯上',
                raw: 'sitting_on_stairs'
            },
            {
                local: '坐在桌子上',
                raw: 'sitting_on_table'
            },
            {
                local: '坐在水上',
                raw: 'sitting_on_water'
            },
            {
                local: '坐垫',
                raw: 'cushion'
            },
            {
                local: '盘腿坐',
                raw: 'indian_style'
            },
            {
                local: '坐在椅子上',
                raw: 'sitting_on_chair'
            },
            {
                local: '侧坐在鞍上',
                raw: 'sidesaddle'
            },
            {
                local: '坐在床上',
                raw: 'sitting_on_bed'
            },
            {
                local: '坐在课桌上',
                raw: 'sitting_on_desk'
            },
            {
                local: '坐在大腿上',
                raw: 'sitting_on_lap'
            },
            {
                local: '坐在人身上',
                raw: 'sitting_on_person'
            },
            {
                local: '对坐体位',
                raw: 'upright_straddle'
            },
            {
                local: '蹲下',
                raw: 'squatting'
            },
            {
                local: '一只膝盖',
                raw: 'one_knee'
            },
            {
                local: '下跪',
                raw: 'kneeling'
            },
            {
                local: '四肢着地',
                raw: 'all_fours'
            },
            {
                local: '凹版姿势',
                raw: 'gravure_pose'
            },
            {
                local: '踢',
                raw: 'kicking'
            },
            {
                local: '高踢',
                raw: 'high_kick'
            },
            {
                local: '泡脚',
                raw: 'soaking_feet'
            },
            {
                local: '斜倚',
                raw: 'reclining'
            },
            {
                local: '抱自己的双腿',
                raw: 'hugging_own_legs'
            },
            {
                local: '裸腿',
                raw: 'bare_legs'
            },
            {
                local: '(强调)两腿之间',
                raw: 'between_legs'
            },
            {
                local: '只画了一部分腿',
                raw: 'cropped_legs'
            },
            {
                local: 'KDA组合(英雄联盟)',
                raw: 'k/da_(league_of_legends)'
            },
            {
                local: '腿部系着带子',
                raw: 'leg_belt'
            },
            {
                local: '腿毛',
                raw: 'leg_hair'
            },
            {
                local: '抬起腿',
                raw: 'leg_up'
            },
            {
                local: '两腿分开',
                raw: 'legs_apart'
            },
            {
                local: 'M字摆腿',
                raw: 'lowleg'
            },
            {
                local: '机械义足',
                raw: 'mechanical_legs'
            },
            {
                local: '多足角色',
                raw: 'multiple_legs'
            },
            {
                local: '没画出腿',
                raw: 'no_legs'
            },
            {
                local: '裆胯以下裸着',
                raw: 'no_legwear'
            },
            {
                local: '尾巴蜷到两腿之间',
                raw: 'tail_between_legs'
            },
            {
                local: '裸足',
                raw: 'barefoot'
            },
            {
                local: '单脚不在图内',
                raw: 'foot_out_of_frame'
            },
            {
                local: '脚印',
                raw: 'footprints'
            },
            {
                local: '脚的画法错误',
                raw: 'dirty_feet'
            },
            {
                local: '脚',
                raw: 'feet'
            },
            {
                local: '双脚不在图内',
                raw: 'feet_out_of_frame'
            },
            {
                local: '翘起脚',
                raw: 'feet_up'
            },
            {
                local: '脚部作画错误',
                raw: 'wrong_feet'
            },
            {
                local: '骆驼趾',
                raw: 'cameltoe'
            },
            {
                local: '萌向的内八腿',
                raw: 'pigeon-toed'
            },
            {
                local: '踮起脚尖',
                raw: 'tiptoes'
            },
            {
                local: '趾尖|脚尖',
                raw: 'toe-point'
            },
            {
                local: '欠损|独脚|肢体残缺|欠损少女',
                raw: 'amputee'
            },
            {
                local: '脚踝丝环',
                raw: 'ankle_strap'
            },
            {
                local: '脚踝套',
                raw: 'ankle_wrap'
            },
            {
                local: '交叉脚踝',
                raw: 'crossed_ankles'
            },
            {
                local: '夹鼻眼镜|无脚眼镜',
                raw: 'pince-nez'
            },
            {
                local: '抬腿露阴',
                raw: 'folded'
            },
            {
                local: '肉腿',
                raw: 'thick_thighs'
            },
            {
                local: '腿上系着带子或工具包或枪套',
                raw: 'thigh_holster'
            }
        ],
        其他动作: [
            {
                local: '胸部互碰|胸顶着胸',
                raw: 'asymmetrical_docking'
            },
            {
                local: '背对背',
                raw: 'back-to-back'
            },
            {
                local: '舔阴',
                raw: 'cunnilingus'
            },
            {
                local: '眼对眼（对视）',
                raw: 'eye_contact'
            },
            {
                local: '面对另一个',
                raw: 'facing_another'
            },
            {
                local: '喂食',
                raw: 'feeding'
            },
            {
                local: '口内指交',
                raw: "finger_in_another's_mouth"
            },
            {
                local: '指交',
                raw: 'fingering'
            },
            {
                local: '法国之吻',
                raw: 'french_kiss'
            },
            {
                local: '递|赠送',
                raw: 'giving'
            },
            {
                local: '素股|臀推',
                raw: 'grinding'
            },
            {
                local: '猥亵',
                raw: 'groping'
            },
            {
                local: '牵手',
                raw: 'holding_hands'
            },
            {
                local: '拥抱',
                raw: 'hug'
            },
            {
                local: '即将接吻',
                raw: 'imminent_kiss'
            },
            {
                local: '递食物',
                raw: 'incoming_food'
            },
            {
                local: '递礼物',
                raw: 'incoming_gift'
            },
            {
                local: '紧扣的双手',
                raw: 'interlocked_fingers'
            },
            {
                local: '壁咚',
                raw: 'Kabedon'
            },
            {
                local: '膝枕',
                raw: 'lap_pillow'
            },
            {
                local: '舔阴茎',
                raw: 'licking_penis'
            },
            {
                local: '长舌头',
                raw: 'long_tongue'
            },
            {
                local: '掏耳勺',
                raw: 'mimikaki'
            },
            {
                local: '迎接射精而伸出舌头',
                raw: 'oral_invitation'
            },
            {
                local: '公主抱',
                raw: 'princess_carry'
            },
            {
                local: '共浴|鸳鸯浴',
                raw: 'shared_bathing'
            },
            {
                local: '共享食物|用嘴递食物',
                raw: 'shared_food'
            },
            {
                local: '坐在头上',
                raw: 'sitting_on_head'
            },
            {
                local: '坐在肩膀上',
                raw: 'sitting_on_shoulder'
            },
            {
                local: '掌掴',
                raw: 'slapping'
            },
            {
                local: '打屁股',
                raw: 'spanking'
            },
            {
                local: '雪中打伞的恋人梗',
                raw: 'special_feeling_(meme)'
            },
            {
                local: '胸挤胸',
                raw: 'symmetrical_docking'
            },
            {
                local: '舌头',
                raw: 'tongue'
            },
            {
                local: '吐舌头',
                raw: 'tongue_out'
            },
            {
                local: '小舌头|口盖垂|悬雍垂',
                raw: 'uvula'
            },
            {
                local: '咬耳朵',
                raw: 'ear_biting'
            },
            {
                local: '混浴',
                raw: 'mixed_bathing'
            }
        ]
    },
    画面: {
        画质: [
            {
                local: '格子的',
                raw: 'checkered'
            },
            {
                local: '低分辨率',
                raw: 'lowres'
            },
            {
                local: '高分辨率',
                raw: 'highres'
            },
            {
                local: '超高分辨率',
                raw: 'absurdres'
            },
            {
                local: '极高分辨率',
                raw: 'incredibly absurdres'
            },
            {
                local: '超级高分辨率/大文件',
                raw: 'huge filesize'
            },
            {
                local: '壁纸',
                raw: 'wallpaper'
            },
            {
                local: '点阵图',
                raw: 'pixel art'
            },
            {
                local: '单色图片',
                raw: 'monochrome'
            },
            {
                local: '色彩斑斓的',
                raw: 'colorful'
            }
        ],
        艺术风格: [
            {
                local: '原画',
                raw: 'artbook'
            },
            {
                local: '游戏CG',
                raw: 'game cg'
            },
            {
                local: '漫画',
                raw: 'comic'
            },
            {
                local: '四格',
                raw: '4koma'
            },
            {
                local: 'GIF格式图片',
                raw: 'animated gif'
            },
            {
                local: '抱枕',
                raw: 'dakimakura'
            },
            {
                local: '角色扮演',
                raw: 'cosplay'
            },
            {
                local: '穿越',
                raw: 'crossover'
            },
            {
                local: '暗的',
                raw: 'dark'
            },
            {
                local: '亮的',
                raw: 'light'
            },
            {
                local: '猎奇',
                raw: 'guro'
            },
            {
                local: '写实',
                raw: 'realistic'
            },
            {
                local: '照片',
                raw: 'photo'
            },
            {
                local: '真实',
                raw: 'real'
            },
            {
                local: '风景',
                raw: 'landscape/scenery'
            },
            {
                local: '城市风景',
                raw: 'cityscape'
            },
            {
                local: '科技幻想',
                raw: 'science fiction'
            },
            {
                local: '原创',
                raw: 'original'
            },
            {
                local: '拙劣的模仿',
                raw: 'parody'
            },
            {
                local: '拟人',
                raw: 'personification'
            },
            {
                local: '视觉错误',
                raw: 'optical illusion'
            },
            {
                local: '名画模仿',
                raw: 'fine art parody'
            },
            {
                local: '素描',
                raw: 'sketch'
            },
            {
                local: '传统媒体（手绘稿）',
                raw: 'traditional media'
            },
            {
                local: '透明水彩绘',
                raw: 'watercolor (medium)'
            },
            {
                local: '剪影',
                raw: 'silhouette'
            },
            {
                local: '封面',
                raw: 'cover'
            },
            {
                local: '专辑',
                raw: 'album'
            },
            {
                local: '图上有字样',
                raw: 'sample'
            },
            {
                local: '背影像',
                raw: 'back'
            },
            {
                local: '半身像',
                raw: 'bust'
            },
            {
                local: '侧面绘',
                raw: 'profile'
            },
            {
                local: '表情绘（各种表情）',
                raw: 'expressions'
            },
            {
                local: '一部作品中的主要人物集齐',
                raw: 'everyone'
            },
            {
                local: '一列列小图组成大图',
                raw: 'column lineup'
            },
            {
                local: '透明的背景',
                raw: 'transparent background'
            },
            {
                local: '简单的背景',
                raw: 'simple background'
            },
            {
                local: '渐变的背景',
                raw: 'gradient background'
            },
            {
                local: '背景是前景的放大版',
                raw: 'zoom layer'
            },
            {
                local: '8bit游戏',
                raw: '8 Bit Game'
            },
            {
                local: '80动画',
                raw: '1980s anime'
            },
            {
                local: '迪士尼电影',
                raw: 'disney movie'
            },
            {
                local: '哥特摇滚',
                raw: 'goth'
            },
            {
                local: '80电影',
                raw: '80s movie'
            },
            {
                local: '泡泡龙',
                raw: 'bubble bobble'
            },
            {
                local: '皮克斯动画',
                raw: 'style of Pixar'
            },
            {
                local: '宝丽来艺术',
                raw: 'Polaroid art'
            },
            {
                local: '万花筒摄影',
                raw: 'Kaleidoscope Photography'
            },
            {
                local: '欧泊渲染',
                raw: 'opal render'
            },
            {
                local: '色谱图',
                raw: 'chemigram'
            },
            {
                local: '吉卜力风格',
                raw: 'Studio Ghibli'
            },
            {
                local: '梦幻',
                raw: 'dreamlike'
            },
            {
                local: '签绘风格',
                raw: '(faux traditional media)'
            },
            {
                local: '原神冲击',
                raw: 'genshin impact'
            },
            {
                local: '碧蓝航线',
                raw: 'azur lane'
            },
            {
                local: '舰队收藏',
                raw: 'kantai collection'
            },
            {
                local: '边缘行者',
                raw: 'rebecca (cyberpunk)'
            },
            {
                local: '电锯人',
                raw: 'chainsaw man'
            },
            {
                local: '魔法旋涡',
                raw: 'Magic Vortex'
            },
            {
                local: '柴油朋克',
                raw: '((dieselpunk))'
            },
            {
                local: '杂志扫描',
                raw: 'magazine scan'
            },
            {
                local: '专辑封面',
                raw: 'album cover'
            },
            {
                local: '线条变粗',
                raw: '(lineart)'
            },
            {
                local: '蒸汽波',
                raw: 'synthwave'
            },
            {
                local: '洛可可',
                raw: '(illustration),(paper figure),(lococo),((impasto)),(shiny skin)'
            }
        ],
        艺术类型: [
            {
                local: '单色图片',
                raw: 'monochrome'
            },
            {
                local: '拼贴艺术',
                raw: 'Collage'
            },
            {
                local: '彩色玻璃',
                raw: 'Dalle de verre'
            },
            {
                local: '像素画',
                raw: 'pixel art'
            },
            {
                local: '瓷画',
                raw: 'Encaustic painting'
            },
            {
                local: '水墨画',
                raw: 'Ink wash painting'
            },
            {
                local: '铜版雕刻',
                raw: 'Mezzotint'
            },
            {
                local: '剪影',
                raw: 'silhouette'
            },
            {
                local: '插画',
                raw: 'illustration'
            },
            {
                local: '水彩画',
                raw: '(((ink))), ((watercolor))'
            },
            {
                local: '浮世绘',
                raw: 'illustration,(((ukiyoe))),((sketch)),((japanese_art))'
            },
            {
                local: '中国风',
                raw: '((wash painting)),((ink s...))'
            },
            {
                local: '油画',
                raw: '((dyeing)),((oil painting)),((impasto))'
            },
            {
                local: '黑白草图',
                raw: '(posing sketch), (monochrome)'
            },
            {
                local: '手画草稿',
                raw: 'sketch'
            },
            {
                local: '铅笔速写',
                raw: '(monochrome), (gray scale), (pencil sketch lines'
            },
            {
                local: '彩铅画',
                raw: '(watercolor pencil)'
            }
        ],
        艺术派系: [
            {
                local: '新艺术主义',
                raw: '((art nouveau))'
            },
            {
                local: '古典主义',
                raw: '((classicism))'
            },
            {
                local: '未来主义',
                raw: '((futurism))'
            },
            {
                local: '达达主义',
                raw: '((Dadaism))'
            },
            {
                local: '抽象艺术',
                raw: '((abstract art))'
            },
            {
                local: 'ASCII艺术',
                raw: '((ASCII art))'
            }
        ],
        艺术家风格: [
            {
                local: '穆夏风格',
                raw: '((alphonse mucha))'
            },
            {
                local: '莫奈风格',
                raw: '((Monet style))'
            }
        ],
        光照: [
            {
                local: '轮廓光',
                raw: 'rim light'
            },
            {
                local: '体积光',
                raw: 'Volumetric Lighting'
            },
            {
                local: '霓虹灯',
                raw: 'glowing neon lights'
            },
            {
                local: '电影级光照',
                raw: 'Cinematic Lighting'
            },
            {
                local: '透镜光晕',
                raw: 'lens flare'
            },
            {
                local: '金属光泽',
                raw: 'metallic luster'
            },
            {
                local: '氛围光照',
                raw: 'moody lighting'
            },
            {
                local: '丁达尔效应',
                raw: 'Tyndall effect'
            },
            {
                local: '漏光光效',
                raw: 'light leaks'
            },
            {
                local: '背景光',
                raw: 'background light'
            },
            {
                local: '自然光',
                raw: 'available light'
            }
        ],
        写实: [
            {
                local: '写实',
                raw: 'realistic'
            },
            {
                local: '厚涂（风格）',
                raw: 'highres'
            },
            {
                local: '照片（风格）',
                raw: 'photo_(medium)'
            },
            {
                local: '油画',
                raw: 'oil_painting'
            },
            {
                local: '真实',
                raw: 'reality'
            },
            {
                local: '照片(拍立得)',
                raw: 'polaroid'
            }
        ],
        素描: [
            {
                local: '素描',
                raw: 'sketch'
            },
            {
                local: '色块',
                raw: 'flat_color'
            },
            {
                local: '单色',
                raw: 'monochrome'
            },
            {
                local: '纯色',
                raw: 'spot_color'
            },
            {
                local: '半色调',
                raw: 'halftone'
            },
            {
                local: '灰度',
                raw: 'greyscale'
            },
            {
                local: '高对比度',
                raw: 'high_contrast'
            },
            {
                local: '部分着色',
                raw: 'partially_colored'
            },
            {
                local: '色差、色失焦',
                raw: 'chromatic_aberration'
            },
            {
                local: '轮廓加深',
                raw: 'contour_deepening'
            },
            {
                local: '轮廓线',
                raw: 'outline'
            },
            {
                local: '剪影',
                raw: 'silhouette'
            }
        ],
        画笔: [
            {
                local: '传统画布（如纸等）',
                raw: 'traditional_media'
            },
            {
                local: '签绘风格',
                raw: 'faux_traditional_media'
            },
            {
                local: '马克笔',
                raw: 'marker_(medium)'
            },
            {
                local: '马克笔（中性灰色）',
                raw: 'copics'
            },
            {
                local: '铅笔速写',
                raw: 'pencil_sketch_lines'
            },
            {
                local: '石墨铅笔',
                raw: 'graphite_(medium)'
            },
            {
                local: '彩色铅笔',
                raw: 'colored_pencil_(medium)'
            },
            {
                local: '绘图笔',
                raw: 'millipen_(medium)'
            },
            {
                local: '绘图笔',
                raw: 'nib_pen_(medium)'
            },
            {
                local: '圆珠笔',
                raw: 'ballpoint_pen_(medium)_'
            },
            {
                local: '柔和的色彩',
                raw: 'pastel_color'
            },
            {
                local: '水彩',
                raw: 'watercolor_(medium)'
            },
            {
                local: '丙烯漆料画',
                raw: 'acrylic_paint_(medium)'
            },
            {
                local: '线条变粗',
                raw: 'contour_deepening'
            }
        ],
        颜色: [
            {
                local: '橙色',
                raw: 'orange'
            },
            {
                local: '蓝色',
                raw: 'blue'
            },
            {
                local: '红色',
                raw: 'red'
            },
            {
                local: '浅棕色',
                raw: 'light_brown'
            },
            {
                local: '深粉色',
                raw: 'dark_pink'
            },
            {
                local: '卡其色',
                raw: 'khaki'
            },
            {
                local: '金黄色的',
                raw: 'blonde'
            },
            {
                local: '棕色',
                raw: 'brown'
            },
            {
                local: '黑色',
                raw: 'black'
            },
            {
                local: '灰色',
                raw: 'gray'
            },
            {
                local: '深灰色',
                raw: 'darkgray'
            },
            {
                local: '银色',
                raw: 'silver'
            },
            {
                local: '浅灰色',
                raw: 'lightgray'
            },
            {
                local: '庚氏灰色',
                raw: 'gainsboro'
            },
            {
                local: '白烟色',
                raw: 'whitesmoke'
            },
            {
                local: '雪白色',
                raw: 'snow'
            },
            {
                local: '幽灵白',
                raw: 'ghostwhite'
            },
            {
                local: '花白色',
                raw: 'floralwhite'
            },
            {
                local: '亚麻色',
                raw: 'linen'
            },
            {
                local: '古董白',
                raw: 'antiquewhite'
            },
            {
                local: '番木瓜色',
                raw: 'papayawhip'
            },
            {
                local: '漂白杏仁色',
                raw: 'blanchedalmond'
            },
            {
                local: '饼干色',
                raw: 'bisque'
            },
            {
                local: '鹿皮鞋色',
                raw: 'moccasin'
            },
            {
                local: '纳瓦霍白',
                raw: 'navajowhite'
            },
            {
                local: '桃肉色',
                raw: 'peachpuff'
            },
            {
                local: '薄雾玫瑰',
                raw: 'mistyrose'
            },
            {
                local: '淡紫红色',
                raw: 'lavenderblush'
            },
            {
                local: '贝壳白',
                raw: 'seashell'
            },
            {
                local: '老花色',
                raw: 'oldlace'
            },
            {
                local: '象牙色',
                raw: 'ivory'
            },
            {
                local: '蜜色',
                raw: 'honeydew'
            },
            {
                local: '薄荷奶油色',
                raw: 'mintcream'
            },
            {
                local: '蔚蓝色',
                raw: 'azure'
            },
            {
                local: '艾莉丝蓝',
                raw: 'aliceblue'
            },
            {
                local: '薰衣草色',
                raw: 'lavender'
            },
            {
                local: '淡钢蓝色',
                raw: 'lightsteelblue'
            },
            {
                local: '亮石板灰',
                raw: 'lightslategray'
            },
            {
                local: '灰石色',
                raw: 'slategray'
            },
            {
                local: '钢蓝色',
                raw: 'steelblue'
            },
            {
                local: '皇家蓝',
                raw: 'royalblue'
            },
            {
                local: '午夜蓝',
                raw: 'midnightblue'
            },
            {
                local: '海军蓝',
                raw: 'navy'
            },
            {
                local: '深蓝色',
                raw: 'darkblue'
            },
            {
                local: '中蓝色',
                raw: 'mediumblue'
            },
            {
                local: '道奇蓝',
                raw: 'dodgerblue'
            },
            {
                local: '矢车菊蓝',
                raw: 'cornflowerblue'
            },
            {
                local: '深天蓝',
                raw: 'skyblue'
            },
            {
                local: '淡蓝色',
                raw: 'lightblue'
            },
            {
                local: '粉蓝色',
                raw: 'powderblue'
            },
            {
                local: '淡青色',
                raw: 'paleturquoise'
            },
            {
                local: '青色',
                raw: 'lightcyan'
            },
            {
                local: '碧绿色',
                raw: 'cyan'
            },
            {
                local: '绿松石色',
                raw: 'aquamarine'
            },
            {
                local: '中绿松石色',
                raw: 'turquoise'
            },
            {
                local: '深绿松石色',
                raw: 'mediumturquoise'
            },
            {
                local: '浅海绿色',
                raw: 'darkturquoise'
            },
            {
                local: '军服蓝色',
                raw: 'lightseagreen'
            },
            {
                local: '深青色',
                raw: 'cadetblue'
            },
            {
                local: '水鸭色',
                raw: 'darkcyan'
            },
            {
                local: '暗灰蓝色',
                raw: 'teal'
            },
            {
                local: '深绿色',
                raw: 'darkslategray'
            },
            {
                local: '绿色',
                raw: 'darkgreen'
            },
            {
                local: '森林绿色',
                raw: 'green'
            },
            {
                local: '海绿色',
                raw: 'forestgreen'
            },
            {
                local: '中海绿色',
                raw: 'seagreen'
            },
            {
                local: '中绿宝石色',
                raw: 'mediumseagreen'
            },
            {
                local: '暗海绿色',
                raw: 'mediumaquamarine'
            },
            {
                local: '绿松石色',
                raw: 'darkseagreen'
            },
            {
                local: '淡绿色',
                raw: 'palegreen'
            },
            {
                local: '草绿色',
                raw: 'lightgreen'
            },
            {
                local: '中春绿色',
                raw: 'springgreen'
            },
            {
                local: '草坪绿',
                raw: 'mediumspringgreen'
            },
            {
                local: '查特酒绿色',
                raw: 'lawngreen'
            },
            {
                local: '黄绿色',
                raw: 'chartreuse'
            },
            {
                local: '酸橙色',
                raw: 'greenyellow'
            },
            {
                local: '酸橙绿',
                raw: 'lime'
            },
            {
                local: '橄榄褐色',
                raw: 'limegreen'
            },
            {
                local: '橄榄绿色',
                raw: 'yellowgreen'
            },
            {
                local: '橄榄色',
                raw: 'darkolivegreen'
            },
            {
                local: '橄榄褐色',
                raw: 'olivedrab'
            },
            {
                local: '橄榄色',
                raw: 'olive'
            },
            {
                local: '暗卡其色',
                raw: 'darkkhaki'
            },
            {
                local: '淡金菊色',
                raw: 'palegoldenrod'
            },
            {
                local: '玉米色',
                raw: 'cornsilk'
            },
            {
                local: '米色',
                raw: 'beige'
            },
            {
                local: '浅黄色',
                raw: 'lightyellow'
            },
            {
                local: '亮金黄色',
                raw: 'lightgoldenrodyellow'
            },
            {
                local: '柠檬绸色',
                raw: 'lemonchiffon'
            },
            {
                local: '小麦色',
                raw: 'wheat'
            },
            {
                local: '琥珀色',
                raw: 'burlywood'
            },
            {
                local: '棕褐色',
                raw: 'tan'
            },
            {
                local: '黄色',
                raw: 'yellow'
            },
            {
                local: '金色',
                raw: 'gold'
            },
            {
                local: '橙褐色',
                raw: 'sandybrown'
            },
            {
                local: '暗橙色',
                raw: 'darkorange'
            },
            {
                local: '金菊色',
                raw: 'goldenrod'
            },
            {
                local: '秘鲁色',
                raw: 'peru'
            },
            {
                local: '暗金菊色',
                raw: 'darkgoldenrod'
            },
            {
                local: '巧克力色',
                raw: 'chocolate'
            },
            {
                local: '黄土赭色',
                raw: 'sienna'
            },
            {
                local: '马鞍棕色',
                raw: 'saddlebrown'
            },
            {
                local: '栗色',
                raw: 'maroon'
            },
            {
                local: '暗红色',
                raw: 'darkred'
            },
            {
                local: '耐火砖色',
                raw: 'firebrick'
            },
            {
                local: '印第安红色',
                raw: 'indianred'
            },
            {
                local: '玫瑰棕色',
                raw: 'rosybrown'
            },
            {
                local: '深鲑鱼肉色',
                raw: 'darksalmon'
            },
            {
                local: '浅珊瑚色',
                raw: 'lightcoral'
            },
            {
                local: '鲑鱼肉色',
                raw: 'salmon'
            },
            {
                local: '亮鲑鱼肉色',
                raw: 'lightsalmon'
            },
            {
                local: '珊瑚色',
                raw: 'coral'
            },
            {
                local: '番茄红',
                raw: 'tomato'
            },
            {
                local: '橙红色',
                raw: 'orangered'
            },
            {
                local: '深粉红色',
                raw: 'crimson'
            },
            {
                local: '中紫罗兰红色',
                raw: 'mediumvioletred'
            },
            {
                local: '深粉色',
                raw: 'deeppink'
            },
            {
                local: '热粉红色',
                raw: 'hotpink'
            },
            {
                local: '淡紫罗兰红色',
                raw: 'palevioletred'
            },
            {
                local: '粉色',
                raw: 'pink'
            },
            {
                local: '浅粉色',
                raw: 'lightpink'
            },
            {
                local: '蓟色',
                raw: 'thistle'
            },
            {
                local: '洋红色',
                raw: 'magenta'
            },
            {
                local: '紫红色',
                raw: 'fuchsia'
            },
            {
                local: '紫色',
                raw: 'violet'
            },
            {
                local: '洋李色',
                raw: 'plum'
            },
            {
                local: '兰花紫',
                raw: 'orchid'
            },
            {
                local: '中兰花紫色',
                raw: 'mediumorchid'
            },
            {
                local: '暗兰花紫色',
                raw: 'darkorchid'
            },
            {
                local: '暗紫罗兰色',
                raw: 'darkviolet'
            },
            {
                local: '暗洋红色',
                raw: 'darkmagenta'
            },
            {
                local: '紫色',
                raw: 'purple'
            },
            {
                local: '靛蓝色',
                raw: 'indigo'
            },
            {
                local: '暗灰蓝色',
                raw: 'darkslateblue'
            },
            {
                local: '蓝紫色',
                raw: 'blueviolet'
            },
            {
                local: '中紫色',
                raw: 'mediumpurple'
            },
            {
                local: '石蓝色',
                raw: 'slateblue'
            },
            {
                local: '中石板蓝色',
                raw: 'mediumslateblue'
            }
        ],
        背景: [
            {
                local: '幻想风格',
                raw: 'fantasy'
            },
            {
                local: '科技幻想',
                raw: 'ban'
            },
            {
                local: '赛博朋克',
                raw: 'cyberpunk'
            },
            {
                local: '景深(画法)',
                raw: 'depth_of_field'
            },
            {
                local: '背景模糊',
                raw: 'blurry'
            },
            {
                local: '前景模糊',
                raw: 'blurry_foreground'
            },
            {
                local: '简单的背景',
                raw: 'simple_background'
            },
            {
                local: '黑色背景',
                raw: 'black_background'
            },
            {
                local: '白色背景',
                raw: 'white_background'
            },
            {
                local: '透明背景',
                raw: 'transparent_background'
            },
            {
                local: '米色背景',
                raw: 'beige_background'
            },
            {
                local: '棕色背景',
                raw: 'brown_background'
            },
            {
                local: '棕褐色背景',
                raw: 'tan_background'
            },
            {
                local: '灰色背景',
                raw: 'grey_background'
            },
            {
                local: '双色调背景',
                raw: 'two-tone_background'
            },
            {
                local: '渐变的背景',
                raw: 'gradient_background'
            },
            {
                local: '多彩的背景',
                raw: 'multicolored_background'
            },
            {
                local: '彩虹背景',
                raw: 'rainbow_background'
            },
            {
                local: '抽象背景',
                raw: 'abstract_background'
            },
            {
                local: '菱形背景',
                raw: 'argyle_background'
            },
            {
                local: '方格背景',
                raw: 'checkered_background'
            },
            {
                local: '花朵点缀的背景',
                raw: 'floral_background'
            },
            {
                local: '网点图背景',
                raw: 'halftone_background'
            },
            {
                local: '桃色背景',
                raw: 'heart_background'
            },
            {
                local: '蜂窝风格背景',
                raw: 'honeycomb_background'
            },
            {
                local: '格子呢背景',
                raw: 'plaid_background'
            },
            {
                local: '圆斑背景',
                raw: 'polka_dot'
            },
            {
                local: '圆斑背景',
                raw: 'striped_background'
            },
            {
                local: '风景',
                raw: 'scenery'
            },
            {
                local: '景观',
                raw: 'landscape'
            },
            {
                local: '花卉图案装饰的背景',
                raw: 'foral_background'
            },
            {
                local: '作物顶部悬垂',
                raw: 'crop_top_overhang'
            },
            {
                local: '星空背景',
                raw: 'starry_background'
            },
            {
                local: '闪着星光的背景',
                raw: 'sparkle_background'
            },
            {
                local: '城市背景',
                raw: 'cityscape'
            },
            {
                local: '城市灯光背景',
                raw: 'city_lights'
            },
            {
                local: '时钟背景',
                raw: 'clock_background'
            },
            {
                local: '气泡背景',
                raw: 'bubble_background'
            },
            {
                local: '边框',
                raw: 'border'
            },
            {
                local: '柱状画布背景',
                raw: 'pillarboxed'
            },
            {
                local: '背景或画框是圆角',
                raw: 'rounded_corners'
            },
            {
                local: '相机取景框',
                raw: 'viewfinder'
            },
            {
                local: '套着画框(背景)',
                raw: 'windowboxed'
            },
            {
                local: '一部分画到了背景框外',
                raw: 'outside_border'
            },
            {
                local: '回忆场景',
                raw: 'flashback'
            },
            {
                local: '文字背景',
                raw: 'wall_of_text'
            },
            {
                local: '背景文字',
                raw: 'background_text'
            }
        ]
    },
    环境: {
        季节: [
            {
                local: '春天',
                raw: 'in spring'
            },
            {
                local: '夏天',
                raw: 'in summer'
            },
            {
                local: '秋天',
                raw: 'in autumn'
            },
            {
                local: '冬天',
                raw: 'in winter'
            },
            {
                local: '秋景',
                raw: '(autumn maple forest:1.3),(very few fallen leaves),(path)'
            }
        ],
        天气: [
            {
                local: '白天',
                raw: 'day'
            },
            {
                local: '黄昏',
                raw: 'dusk'
            },
            {
                local: '夜晚',
                raw: 'night'
            },
            {
                local: '下雨',
                raw: 'rain'
            },
            {
                local: '雨天',
                raw: 'rainy days'
            },
            {
                local: '日落',
                raw: 'sunset'
            },
            {
                local: '多云',
                raw: 'cloudy'
            },
            {
                local: '满月',
                raw: 'full moon'
            },
            {
                local: '太阳',
                raw: 'sun'
            },
            {
                local: '月亮',
                raw: 'moon'
            },
            {
                local: '满月',
                raw: 'full_moon'
            },
            {
                local: '星星',
                raw: 'stars'
            },
            {
                local: '天空',
                raw: 'sky'
            },
            {
                local: '宇宙',
                raw: 'universe'
            },
            {
                local: '冰雪',
                raw: 'snow,ice'
            },
            {
                local: '雪花',
                raw: 'snowflakes'
            },
            {
                local: '闪电',
                raw: 'lighting'
            },
            {
                local: '彩虹',
                raw: 'rainbow'
            },
            {
                local: '流星雨',
                raw: 'meteor shower'
            },
            {
                local: '积雨云',
                raw: 'cumulonimbus'
            }
        ],
        大自然: [
            {
                local: '大自然',
                raw: 'nature'
            },
            {
                local: '大海',
                raw: 'sea'
            },
            {
                local: '海洋',
                raw: 'ocean'
            },
            {
                local: '海边',
                raw: 'beach'
            },
            {
                local: '山丘',
                raw: 'hills'
            },
            {
                local: '草地',
                raw: 'in a meadow'
            },
            {
                local: '海滩',
                raw: 'on the beach'
            },
            {
                local: '水中',
                raw: 'underwater'
            },
            {
                local: '海边',
                raw: 'over the sea'
            },
            {
                local: '树林',
                raw: 'grove'
            },
            {
                local: '沙漠',
                raw: 'on a desert'
            },
            {
                local: '高原',
                raw: 'plateau'
            },
            {
                local: '悬崖',
                raw: 'cliff'
            },
            {
                local: '峡谷',
                raw: 'canyon'
            },
            {
                local: '绿洲',
                raw: 'oasis'
            },
            {
                local: '竹林',
                raw: 'bamboo forest'
            },
            {
                local: '冰川',
                raw: 'glacier'
            },
            {
                local: '浮岛',
                raw: 'floating island'
            },
            {
                local: '火山',
                raw: 'volcano'
            },
            {
                local: '大草原',
                raw: 'savanna'
            },
            {
                local: '瀑布',
                raw: 'waterfall'
            },
            {
                local: '溪流',
                raw: 'stream'
            },
            {
                local: '荒地',
                raw: 'wasteland'
            },
            {
                local: '田园',
                raw: 'field'
            },
            {
                local: '稻田',
                raw: 'rice paddy'
            },
            {
                local: '麦田',
                raw: 'wheat field'
            },
            {
                local: '花田',
                raw: 'flower field'
            },
            {
                local: '花海',
                raw: 'flower sea'
            },
            {
                local: '太空',
                raw: 'space'
            },
            {
                local: '星空',
                raw: 'starry sky'
            },
            {
                local: '湖泊',
                raw: 'lake'
            },
            {
                local: '河流',
                raw: 'river'
            },
            {
                local: '温泉',
                raw: 'onsen'
            },
            {
                local: '繁花草甸',
                raw: 'flowers meadows'
            },
            {
                local: '阿尔卑斯山脉',
                raw: 'Alps'
            },
            {
                local: '梦幻之森(虚幻感.光粒子幽静)',
                raw: 'Dreamy forest'
            },
            {
                local: '山脉',
                raw: 'mountain'
            },
            {
                local: '山上',
                raw: 'on a hill'
            },
            {
                local: '山顶',
                raw: 'the top of the hill'
            },
            {
                local: '室外',
                raw: 'outdoors'
            }
        ],
        水: [
            {
                local: '大海',
                raw: 'ocean'
            },
            {
                local: '滴水',
                raw: 'dripping'
            },
            {
                local: '海滩',
                raw: 'beach'
            },
            {
                local: '湖泊',
                raw: 'lake'
            },
            {
                local: '瀑布',
                raw: 'waterfall'
            },
            {
                local: '涟漪',
                raw: 'ripples'
            },
            {
                local: '漩涡',
                raw: 'swirl'
            },
            {
                local: '波浪',
                raw: 'waves'
            },
            {
                local: '海贝',
                raw: 'seashell'
            },
            {
                local: '海藻',
                raw: 'seaweed'
            }
        ],
        天空: [
            {
                local: '天空',
                raw: 'sky'
            },
            {
                local: '倾斜的天空',
                raw: 'gradient_sky'
            },
            {
                local: '夜空',
                raw: 'night_sky'
            },
            {
                local: '星空',
                raw: 'starry_sky'
            },
            {
                local: '超级银河',
                raw: 'hyper_galaxy'
            },
            {
                local: '星星(天空中的)',
                raw: 'star_(sky)'
            },
            {
                local: '星星轨迹',
                raw: 'star_trail'
            },
            {
                local: '落日',
                raw: 'sunset'
            },
            {
                local: '月亮',
                raw: 'moon'
            },
            {
                local: '月的,_月球的;',
                raw: 'lunar'
            },
            {
                local: '月牙',
                raw: 'crescent'
            },
            {
                local: '新月',
                raw: 'crescent_moon'
            },
            {
                local: '满月',
                raw: 'full_moon'
            },
            {
                local: '月光',
                raw: 'moonlight'
            },
            {
                local: '猩红月亮',
                raw: 'scarlet_moon'
            },
            {
                local: '宇宙',
                raw: 'universe'
            },
            {
                local: '太空',
                raw: 'space'
            },
            {
                local: '星球',
                raw: 'planet'
            },
            {
                local: '空间站',
                raw: 'from_space_station'
            },
            {
                local: '卫星',
                raw: 'satellite'
            }
        ],
        云: [
            {
                local: '卷云',
                raw: 'cirrus'
            },
            {
                local: '卷积云',
                raw: 'Cirrocumulus'
            },
            {
                local: '卷层云',
                raw: 'Cirrostratus'
            },
            {
                local: '高积云',
                raw: 'Altocumulus'
            },
            {
                local: '高层云',
                raw: 'Altostratus'
            },
            {
                local: '层云',
                raw: 'stratus'
            },
            {
                local: '层积云',
                raw: 'Stratocumulus'
            },
            {
                local: '积云',
                raw: 'cumulus'
            },
            {
                local: '积雨云',
                raw: 'Cumulonimbus'
            },
            {
                local: '雨层云',
                raw: 'Nimbostratus'
            },
            {
                local: '毛卷云',
                raw: 'cirrus_fibratus'
            },
            {
                local: '钩卷云',
                raw: 'cirrus_uncinus'
            },
            {
                local: '密卷云',
                raw: 'cirrus_spissatus'
            },
            {
                local: '絮卷云',
                raw: 'cirrus_floccus'
            },
            {
                local: '堡卷云',
                raw: 'cirrus_castellanus'
            },
            {
                local: '乱卷云',
                raw: 'cirrus_intortus'
            },
            {
                local: '卷积云类',
                raw: 'cirrocumulus'
            },
            {
                local: '层状卷积云',
                raw: 'cirrocumulus_stratiformis'
            },
            {
                local: '絮状卷积云',
                raw: 'cirrocumulus_floccus'
            },
            {
                local: '堡状卷积云',
                raw: 'cirrocumulus_castellanus'
            },
            {
                local: '网状卷积云',
                raw: 'cirrocumulus_lacunosus'
            },
            {
                local: '卷层云类',
                raw: 'cirrostratus'
            },
            {
                local: '毛卷层云',
                raw: 'cirrostratus_fibratus'
            },
            {
                local: '雾卷层云',
                raw: 'cirrostratus_nebulosus'
            },
            {
                local: '高积云类',
                raw: 'altocumulus'
            },
            {
                local: '层状高积云',
                raw: 'altocumulus_strataformis'
            },
            {
                local: '荚状高积云',
                raw: 'altocumulus_lenticularis'
            },
            {
                local: '堡状高积云',
                raw: 'altocumulus_castellanus'
            },
            {
                local: '絮状高积云',
                raw: 'altocumulus_floccus'
            },
            {
                local: '网状高积云',
                raw: 'altocumulus_lacunosus'
            },
            {
                local: '高层云类',
                raw: 'altostratus'
            },
            {
                local: '波状高层云',
                raw: 'altostratus_undulatus'
            },
            {
                local: '复合高层云',
                raw: 'altostratus_duplicates'
            },
            {
                local: '破片高层云',
                raw: 'altostratus_pannus'
            },
            {
                local: '透光高层云',
                raw: 'altostratus_translucidus'
            },
            {
                local: '蔽光高层云',
                raw: 'altostratus_opacus'
            },
            {
                local: '辐状高层云',
                raw: 'altostratus_radiatus'
            },
            {
                local: '乳状高层云',
                raw: 'altostratus_mammatus'
            },
            {
                local: '碎层云',
                raw: 'stratus_fractus'
            },
            {
                local: '雾层云',
                raw: 'stratus_nebulosus'
            },
            {
                local: '波层云',
                raw: 'stratus_undulatus'
            },
            {
                local: '层积云类',
                raw: 'stratocumulus'
            },
            {
                local: '层状层积云',
                raw: 'stratocumulus_stratiformis'
            },
            {
                local: '积雨性层积云',
                raw: 'stratocumulus_cumulogentis'
            },
            {
                local: '堡状层积云',
                raw: 'stratocumulus_castellanus'
            },
            {
                local: '荚状层积云',
                raw: 'stratocumulus_lenticularis'
            },
            {
                local: '絮状层积云',
                raw: 'stratocumulus_lacunosus'
            },
            {
                local: '淡积云',
                raw: 'cumulus_humilis'
            },
            {
                local: '中积云',
                raw: 'cumulus_mediocris'
            },
            {
                local: '浓积云',
                raw: 'cumulus_congestus'
            },
            {
                local: '碎积云',
                raw: 'cumulus_fractus'
            },
            {
                local: '积雨云类',
                raw: 'cumulonimbus'
            },
            {
                local: '秃积雨云',
                raw: 'cumulonimbus_calvus'
            },
            {
                local: '鬃积雨云',
                raw: 'cumulonimbus_capillatus'
            },
            {
                local: '砧积雨云',
                raw: 'cumulonimbus_incus'
            }
        ],
        氛围: [
            {
                local: '新年',
                raw: 'new year'
            },
            {
                local: '兔年',
                raw: 'year of the rabbit'
            },
            {
                local: '情人节',
                raw: 'valentine'
            },
            {
                local: '元宵节',
                raw: 'lantern festival'
            },
            {
                local: '夏日祭',
                raw: 'summer festival'
            },
            {
                local: '七夕节',
                raw: 'tanabata'
            },
            {
                local: '中秋节',
                raw: 'mid-autumn festival'
            },
            {
                local: '万圣节',
                raw: 'halloween'
            },
            {
                local: '圣诞节',
                raw: 'christmas'
            },
            {
                local: '爆炸',
                raw: 'explosion'
            },
            {
                local: '蒸汽',
                raw: 'water vapor'
            },
            {
                local: '焰火',
                raw: 'fireworks'
            },
            {
                local: '落地窗',
                raw: 'ceiling window'
            },
            {
                local: '彩色玻璃',
                raw: 'colourful glass'
            },
            {
                local: '染色玻璃',
                raw: 'stain glass'
            },
            {
                local: '涂鸦墙',
                raw: 'Graffiti wall'
            },
            {
                local: '马赛克背景',
                raw: 'mosaic background'
            },
            {
                local: '液体背景',
                raw: 'liquid background, Sputtered water'
            },
            {
                local: '魔法环',
                raw: 'magic circles'
            },
            {
                local: '荧光蘑菇森林',
                raw: 'fluorescent mushroom forests background'
            },
            {
                local: '彩色泡泡',
                raw: '(((colorful bubble)))'
            },
            {
                local: '海边日落',
                raw: 'in the ocean'
            },
            {
                local: '傍晚背对阳光',
                raw: 'against backlight at dusk'
            },
            {
                local: '黄金时段照明',
                raw: 'golden hour lighting'
            },
            {
                local: '强边缘光',
                raw: 'strong rim light'
            },
            {
                local: '强阴影',
                raw: 'intense shadows'
            }
        ]
    },
    场景: {
        室外: [
            {
                local: '城堡',
                raw: 'castle'
            },
            {
                local: '城市',
                raw: 'city'
            },
            {
                local: '水上乐园',
                raw: 'waterpark'
            },
            {
                local: '旋转木马',
                raw: 'carousel'
            },
            {
                local: '摩天轮',
                raw: 'ferris wheel'
            },
            {
                local: '水族馆',
                raw: 'aquarium'
            },
            {
                local: '动物园',
                raw: 'zoo'
            },
            {
                local: '保龄球馆',
                raw: 'bowling alley'
            },
            {
                local: '美术馆',
                raw: 'art gallery'
            },
            {
                local: '博物馆',
                raw: 'museum'
            },
            {
                local: '天文馆',
                raw: 'planetarium'
            },
            {
                local: '游泳池',
                raw: 'swimming pool'
            },
            {
                local: '体育场',
                raw: 'stadium'
            },
            {
                local: '寺庙',
                raw: 'temple'
            },
            {
                local: '巴士车站',
                raw: 'bus stop'
            },
            {
                local: '火车站',
                raw: 'train station'
            },
            {
                local: '喷泉',
                raw: 'fountain'
            },
            {
                local: '游乐场',
                raw: 'playground'
            },
            {
                local: '市场摊位',
                raw: 'market stall'
            },
            {
                local: '电话亭',
                raw: 'phone booth'
            },
            {
                local: '铁轨',
                raw: 'railroad tracks'
            },
            {
                local: '机场',
                raw: 'airport'
            },
            {
                local: '隧道',
                raw: 'tunnel'
            },
            {
                local: '摩天楼',
                raw: 'skyscraper'
            },
            {
                local: '城市风景',
                raw: 'cityscape'
            },
            {
                local: '废墟',
                raw: 'ruins'
            },
            {
                local: '西罗马建筑',
                raw: 'greco-roman architectur'
            },
            {
                local: '东亚建物',
                raw: 'east asian architecture'
            },
            {
                local: '鸟居',
                raw: 'torii'
            },
            {
                local: '教堂',
                raw: 'church'
            },
            {
                local: '商店',
                raw: 'shop'
            },
            {
                local: '街道',
                raw: 'street'
            },
            {
                local: '赛博朋克城市',
                raw: 'cyberpunk city'
            },
            {
                local: '古风建筑',
                raw: 'chinese style architecture'
            },
            {
                local: '神社',
                raw: 'gohei'
            },
            {
                local: '繁华都市',
                raw: 'Bustling city'
            },
            {
                local: '实验室',
                raw: 'laboratory'
            },
            {
                local: '咖啡馆',
                raw: 'coffee house'
            },
            {
                local: '健身房',
                raw: 'gym'
            },
            {
                local: '图书馆',
                raw: 'library'
            },
            {
                local: '监狱',
                raw: 'prison'
            },
            {
                local: '轮机舱',
                raw: 'engine room'
            },
            {
                local: '栏杆',
                raw: 'handrail'
            },
            {
                local: '霓虹灯',
                raw: 'neon lights'
            },
            {
                local: '路灯',
                raw: 'street lamp'
            },
            {
                local: '道路',
                raw: 'road'
            },
            {
                local: '贫民窟',
                raw: 'shanty town/slum'
            },
            {
                local: '仓库',
                raw: 'warehouse'
            },
            {
                local: '哥特式建筑',
                raw: 'gothic architecture'
            },
            {
                local: '饭店',
                raw: 'restaurant'
            },
            {
                local: '树屋',
                raw: 'treehouse'
            },
            {
                local: '法兰西',
                raw: 'modern,Europe'
            },
            {
                local: '工业化古建筑',
                raw: 'Industrial wind, Chinese architecture'
            },
            {
                local: '建筑废墟',
                raw: 'building_ruins'
            },
            {
                local: '酒吧',
                raw: 'bar'
            },
            {
                local: '居酒屋',
                raw: 'izakaya'
            },
            {
                local: '咖啡馆',
                raw: 'cafe'
            },
            {
                local: '面包店',
                raw: 'bakery'
            },
            {
                local: '便利店',
                raw: 'convenience store'
            },
            {
                local: '超市',
                raw: 'supermarket'
            },
            {
                local: '药店',
                raw: 'pharmacy'
            },
            {
                local: '剧院',
                raw: 'theater'
            },
            {
                local: '电影院',
                raw: 'movie theater'
            },
            {
                local: '工作坊',
                raw: 'workshop'
            },
            {
                local: '法庭',
                raw: 'courtroom'
            },
            {
                local: '公园',
                raw: 'park'
            },
            {
                local: '吊架；秋千',
                raw: 'Trapeze'
            },
            {
                local: '教室',
                raw: 'classroom'
            },
            {
                local: '植物园',
                raw: 'botanical garden'
            },
            {
                local: '游乐园',
                raw: 'amusement_park'
            },
            {
                local: '迪士尼乐园',
                raw: 'Disney_land'
            },
            {
                local: '竞技场',
                raw: 'arena'
            },
            {
                local: '摔角场',
                raw: 'wrestling_ring'
            },
            {
                local: '礼堂',
                raw: 'Auditorium'
            },
            {
                local: '音乐会',
                raw: 'concert'
            },
            {
                local: '日本旅馆',
                raw: 'Japanese_hotel'
            },
            {
                local: '监狱酒吧',
                raw: 'jail_bars'
            },
            {
                local: '在电影院里',
                raw: 'in_the_movie_theatre'
            },
            {
                local: '舞台',
                raw: 'stage'
            },
            {
                local: '港口',
                raw: 'harbor'
            },
            {
                local: '赌场',
                raw: 'casino'
            },
            {
                local: '台球桌',
                raw: 'billiard'
            },
            {
                local: '地牢',
                raw: 'dungeon'
            },
            {
                local: '坟墓',
                raw: 'grave'
            },
            {
                local: '墓地',
                raw: 'graveyard'
            },
            {
                local: '墓碑',
                raw: 'tombstone'
            },
            {
                local: '巨大的石头物体',
                raw: 'monolith'
            },
            {
                local: '拉平（悬挂）',
                raw: 'rappelling'
            },
            {
                local: '建筑',
                raw: 'building'
            },
            {
                local: '建筑',
                raw: 'architecture'
            },
            {
                local: '建筑',
                raw: 'magnificent_architecture'
            },
            {
                local: '摩天楼',
                raw: 'Skyscraper'
            },
            {
                local: '东亚建筑',
                raw: 'east_asian_architecture'
            },
            {
                local: '大教堂',
                raw: 'cathedral'
            },
            {
                local: '中式阁楼',
                raw: 'chinese_style_loft'
            },
            {
                local: '传统中式客房',
                raw: 'traditional_chinese_room'
            },
            {
                local: '塔楼',
                raw: 'turret'
            },
            {
                local: '塔',
                raw: 'tower'
            },
            {
                local: '清真寺',
                raw: 'mosque'
            },
            {
                local: '水库',
                raw: 'reservoir'
            },
            {
                local: '铁路',
                raw: 'railroad'
            },
            {
                local: '铁路',
                raw: 'railway'
            },
            {
                local: '桥',
                raw: 'bridge'
            },
            {
                local: '桥下',
                raw: 'under_bridge'
            },
            {
                local: '废墟',
                raw: 'remains'
            },
            {
                local: '废墟',
                raw: 'rubble_ruins'
            }
        ],
        城市: [
            {
                local: '城市',
                raw: 'city'
            },
            {
                local: '城市风景',
                raw: 'cityscape'
            },
            {
                local: '街道',
                raw: 'street'
            },
            {
                local: '市中心',
                raw: 'downtown'
            },
            {
                local: '人群',
                raw: 'crowd'
            },
            {
                local: '小巷',
                raw: 'alley'
            },
            {
                local: '大道',
                raw: 'in_main_street'
            },
            {
                local: '路口',
                raw: 'Intersection'
            },
            {
                local: '大街',
                raw: 'avenue'
            },
            {
                local: '草坪',
                raw: 'lawn'
            },
            {
                local: '路',
                raw: 'road'
            },
            {
                local: '路径',
                raw: 'path'
            },
            {
                local: '路面',
                raw: 'pavement'
            },
            {
                local: '路标',
                raw: 'road_sign'
            },
            {
                local: '路障',
                raw: 'traffic_cone'
            },
            {
                local: '路灯',
                raw: 'lamppost'
            },
            {
                local: '电线杆和电线',
                raw: 'power_lines'
            },
            {
                local: '栅栏',
                raw: 'fence'
            },
            {
                local: '栏杆',
                raw: 'railing'
            },
            {
                local: '长凳',
                raw: 'bench'
            },
            {
                local: '自动贩卖机',
                raw: 'vending_machine'
            }
        ],
        室内: [
            {
                local: '室内',
                raw: 'indoor'
            },
            {
                local: '浴室',
                raw: 'bathroom'
            },
            {
                local: '厕所隔间',
                raw: 'toilet stall'
            },
            {
                local: '宅男房间',
                raw: 'otaku room'
            },
            {
                local: '自助餐厅',
                raw: 'cafeteria'
            },
            {
                local: '教室',
                raw: 'classroom'
            },
            {
                local: '俱乐部',
                raw: 'clubroom'
            },
            {
                local: '卧室',
                raw: 'bedroom'
            },
            {
                local: '厨房',
                raw: 'kitchen'
            },
            {
                local: '宿舍',
                raw: 'dormitory'
            },
            {
                local: '地库',
                raw: 'dungeon'
            },
            {
                local: '医务室',
                raw: 'infirmary'
            },
            {
                local: '舞台',
                raw: 'stage'
            },
            {
                local: '配电房',
                raw: 'electrical room'
            },
            {
                local: '服务器机房',
                raw: 'server room'
            },
            {
                local: '地下室',
                raw: 'basement'
            },
            {
                local: '美术室',
                raw: 'art room'
            },
            {
                local: '浴室',
                raw: 'bathing'
            },
            {
                local: '楼梯',
                raw: 'stairs'
            },
            {
                local: '温室',
                raw: 'greenhouse'
            }
        ],
        地板: [
            {
                local: '地板',
                raw: 'floor'
            },
            {
                local: '木质地板',
                raw: 'tile_floor'
            }
        ],
        家具: [
            {
                local: '家具',
                raw: 'bedroom'
            },
            {
                local: '榻榻米',
                raw: 'tatami'
            },
            {
                local: '床',
                raw: 'bed'
            },
            {
                local: '沙发',
                raw: 'couch'
            },
            {
                local: '被炉',
                raw: 'kotatsu'
            },
            {
                local: '壁炉',
                raw: 'fireplace'
            },
            {
                local: '窗',
                raw: 'window_'
            },
            {
                local: '窗扇',
                raw: 'sash'
            },
            {
                local: '窗帘',
                raw: 'curtains'
            },
            {
                local: '门',
                raw: 'door'
            },
            {
                local: '推拉门',
                raw: 'sliding_doors'
            },
            {
                local: '衣架',
                raw: 'clothes_rack'
            },
            {
                local: '空调',
                raw: 'air_conditioner'
            },
            {
                local: '桌子',
                raw: 'table'
            },
            {
                local: '课桌',
                raw: 'school_desk'
            },
            {
                local: '椅子',
                raw: 'chair'
            },
            {
                local: '扶手椅',
                raw: 'armchair'
            },
            {
                local: '躺椅',
                raw: 'lounge_chair'
            },
            {
                local: '沙滩椅',
                raw: 'beach_chair'
            },
            {
                local: '折叠椅',
                raw: 'folding_chair'
            },
            {
                local: '隐形椅子',
                raw: 'invisible_chair'
            },
            {
                local: '办公椅',
                raw: 'office_chair'
            },
            {
                local: '轮椅',
                raw: 'wheelchair'
            }
        ],
        床上用品: [
            {
                local: '床单',
                raw: 'bed_sheet'
            },
            {
                local: '床垫；褥子',
                raw: 'mattress'
            },
            {
                local: '日本床垫',
                raw: 'futon'
            },
            {
                local: '坐垫',
                raw: 'cushion'
            },
            {
                local: '地毯',
                raw: 'carpet'
            },
            {
                local: '枕头',
                raw: 'pillow'
            },
            {
                local: '团子抱枕',
                raw: 'dumpling_Hug_Pillow'
            },
            {
                local: '抱枕',
                raw: 'pillow_hug'
            },
            {
                local: 'Yes/No枕头',
                raw: 'yes-no_pillow'
            },
            {
                local: '毛绒玩偶',
                raw: 'stuffed_animal'
            },
            {
                local: '毛绒兔子',
                raw: 'stuffed_bunny'
            },
            {
                local: '小熊',
                raw: 'koakuma'
            }
        ],
        浴室: [
            {
                local: '浴室',
                raw: 'bathroom'
            },
            {
                local: '浴缸',
                raw: 'bathtub,'
            },
            {
                local: '橡皮鸭',
                raw: 'rubber_duck'
            },
            {
                local: '淋浴喷头',
                raw: 'shower_head'
            },
            {
                local: '马桶',
                raw: 'toilet'
            },
            {
                local: '蹲便器',
                raw: 'squat_toilet'
            },
            {
                local: '肥皂',
                raw: 'soap'
            },
            {
                local: '瓷砖',
                raw: 'tiles'
            }
        ]
    },
    物品: {
        学习用品: [
            {
                local: '笔记本',
                raw: 'notebook'
            },
            {
                local: '画笔',
                raw: 'paintbrush'
            },
            {
                local: '铅笔',
                raw: 'pencil'
            },
            {
                local: '书',
                raw: 'book'
            },
            {
                local: '翻开的书',
                raw: 'open_book'
            },
            {
                local: '书摞',
                raw: 'book_stack'
            },
            {
                local: '书架',
                raw: 'bookshelf'
            },
            {
                local: '上学包(手提包',
                raw: 'school_bag'
            },
            {
                local: '背包',
                raw: 'backpack'
            }
        ],
        数码设备: [
            {
                local: '电脑',
                raw: 'computer'
            },
            {
                local: '鼠标',
                raw: 'mouse'
            },
            {
                local: '手机',
                raw: 'cellphone'
            },
            {
                local: '智能手机',
                raw: 'Smartphones'
            },
            {
                local: '掌上游戏机',
                raw: 'handheld_game_console_'
            },
            {
                local: '任天堂3ds',
                raw: 'nintendo_3ds'
            },
            {
                local: '任天堂ds',
                raw: 'nintendo_ds'
            },
            {
                local: '任天堂switch',
                raw: 'nintendo_switch'
            },
            {
                local: '按钮',
                raw: 'buttons'
            },
            {
                local: '电源线',
                raw: 'power_lines'
            },
            {
                local: '电缆',
                raw: 'cable'
            }
        ],
        餐具: [
            {
                local: '锅',
                raw: 'pot'
            },
            {
                local: '茶壶',
                raw: 'teapot'
            },
            {
                local: '长柄勺',
                raw: 'ladle'
            },
            {
                local: '罐子',
                raw: 'can'
            },
            {
                local: '罐装饮料',
                raw: 'soda_can'
            },
            {
                local: '杯子',
                raw: 'cup'
            },
            {
                local: '盘子',
                raw: 'plate'
            },
            {
                local: '托盘',
                raw: 'tray'
            },
            {
                local: '碗',
                raw: 'bowl'
            },
            {
                local: '叉子',
                raw: 'fork'
            },
            {
                local: '筷子',
                raw: 'chopsticks'
            },
            {
                local: '勺子',
                raw: 'spoon'
            },
            {
                local: '水杯',
                raw: 'drinking_glass'
            },
            {
                local: '普通玻璃杯',
                raw: 'tumbler'
            },
            {
                local: '啤酒杯',
                raw: 'beer_mug'
            },
            {
                local: '礼物盒',
                raw: 'gift_box'
            },
            {
                local: '心形状的礼盒',
                raw: 'heart-shaped_box'
            },
            {
                local: '蜡烛',
                raw: 'candle'
            }
        ],
        乐器: [
            {
                local: '音乐',
                raw: 'music'
            },
            {
                local: '吉他',
                raw: 'guitar'
            },
            {
                local: '钢琴',
                raw: 'piano'
            },
            {
                local: '大提琴',
                raw: 'cello'
            },
            {
                local: '演奏乐器',
                raw: 'playing_instrument'
            },
            {
                local: '风铃',
                raw: 'wind_chime'
            }
        ],
        其它物品: [
            {
                local: '手表',
                raw: 'wristwatch'
            },
            {
                local: '折扇',
                raw: 'folding_fan'
            },
            {
                local: '纸扇',
                raw: 'paper_fan'
            },
            {
                local: '团扇',
                raw: 'uchiwa'
            },
            {
                local: '雨伞',
                raw: 'umbrella'
            },
            {
                local: '透明雨伞',
                raw: 'transparent_umbrella'
            },
            {
                local: '封闭伞',
                raw: 'closed_umbrella'
            },
            {
                local: '油纸伞',
                raw: 'oil-paper_umbrella'
            },
            {
                local: '遮阳伞',
                raw: 'Parasol'
            },
            {
                local: '篮子',
                raw: 'basket'
            },
            {
                local: '花束',
                raw: 'bouquet'
            },
            {
                local: '桶',
                raw: 'bucket'
            },
            {
                local: '桶',
                raw: 'pail'
            },
            {
                local: '相机',
                raw: 'camera'
            },
            {
                local: '御币(驱邪布条)',
                raw: 'gohei'
            },
            {
                local: '灯笼',
                raw: 'lantern/lamp'
            },
            {
                local: '鞭',
                raw: 'whip'
            },
            {
                local: '马鞭',
                raw: 'riding_crop'
            },
            {
                local: '札符',
                raw: 'ofuda'
            },
            {
                local: '手杖',
                raw: 'cane'
            },
            {
                local: '魔杖',
                raw: 'wand'
            },
            {
                local: '魔术',
                raw: 'magic'
            },
            {
                local: '交易卡',
                raw: 'trading_card'
            },
            {
                local: '扑克牌',
                raw: 'playing_card'
            },
            {
                local: '磁带盒',
                raw: 'Cassette'
            },
            {
                local: '棋子',
                raw: 'chess_piece'
            },
            {
                local: '硬币',
                raw: 'coin'
            },
            {
                local: 'n.铜币',
                raw: 'copper'
            },
            {
                local: '锤子',
                raw: 'hammer'
            },
            {
                local: '麦克风',
                raw: 'microphone'
            },
            {
                local: '掏耳勺',
                raw: 'mimikaki'
            },
            {
                local: '麻袋',
                raw: 'sack'
            },
            {
                local: '秤',
                raw: 'scales'
            },
            {
                local: '赤壁插图',
                raw: 'chibi_inset'
            },
            {
                local: '损坏',
                raw: 'damaged'
            },
            {
                local: '钻石（形状）',
                raw: 'diamond_(shape)'
            },
            {
                local: '葫芦',
                raw: 'gourd'
            },
            {
                local: '拿着礼物',
                raw: 'holding_gift'
            },
            {
                local: '入口',
                raw: 'inlet'
            },
            {
                local: '钥匙',
                raw: 'key'
            },
            {
                local: '皮带',
                raw: 'leash'
            },
            {
                local: '杠杆,操作杆',
                raw: 'Lever'
            },
            {
                local: '分子',
                raw: 'molecule'
            },
            {
                local: '钱',
                raw: 'money'
            },
            {
                local: '画作(物品',
                raw: 'Painting_(Object)'
            },
            {
                local: '照片（物体）',
                raw: 'photo_(object)'
            },
            {
                local: '沙子',
                raw: 'sand'
            },
            {
                local: '茬',
                raw: 'stubble'
            },
            {
                local: '奖杯',
                raw: 'trophy'
            },
            {
                local: '管顶',
                raw: 'tube_top'
            },
            {
                local: '水瓶',
                raw: 'water_bottle'
            },
            {
                local: '防晒霜|身体乳',
                raw: 'lotion'
            },
            {
                local: '乳液瓶子',
                raw: 'lotion_bottle'
            }
        ],
        武器: [
            {
                local: '武器',
                raw: 'weapon'
            },
            {
                local: '背上的武器',
                raw: 'weapon_on_back'
            },
            {
                local: '肩上的武器',
                raw: 'weapon_over_shoulder'
            },
            {
                local: '大尺寸武器',
                raw: 'huge_weapon'
            },
            {
                local: '往地上插的武器',
                raw: 'planted_weapon'
            },
            {
                local: '破碎的武器',
                raw: 'broken_weapon'
            },
            {
                local: '立剑(planted立',
                raw: 'planted_sword'
            },
            {
                local: '刀',
                raw: 'sword'
            },
            {
                local: '刀鞘',
                raw: 'scabbard'
            },
            {
                local: '出鞘',
                raw: 'unsheathing'
            },
            {
                local: '武士刀',
                raw: 'katana'
            },
            {
                local: '军刀(武器)',
                raw: 'saber_(weapon)'
            },
            {
                local: '镰刀',
                raw: 'scythe'
            },
            {
                local: '柴刀',
                raw: 'nose_hatchet'
            },
            {
                local: '匕首',
                raw: 'dagger'
            },
            {
                local: '剪刀',
                raw: 'scissors'
            },
            {
                local: '斧头',
                raw: 'axe'
            },
            {
                local: '短斧',
                raw: 'hatchet'
            },
            {
                local: '棍子',
                raw: 'stake'
            },
            {
                local: '长矛',
                raw: 'lance'
            },
            {
                local: '三叉戟',
                raw: 'trident'
            },
            {
                local: '弓',
                raw: 'bow_(weapon)'
            },
            {
                local: '箭',
                raw: 'arrow'
            },
            {
                local: '爪(武器)',
                raw: 'claw_(weapon)'
            },
            {
                local: '步枪',
                raw: 'rifle,'
            },
            {
                local: '枪',
                raw: 'gun'
            },
            {
                local: '手枪',
                raw: 'handgun'
            },
            {
                local: '汤普森冲锋枪',
                raw: 'thompson_submachine_gun'
            },
            {
                local: '弹匣(武器)',
                raw: 'magazine_(weapon)'
            },
            {
                local: '甘油炸药',
                raw: 'dynamite'
            },
            {
                local: '炸弹',
                raw: 'bomb'
            },
            {
                local: '跟踪导弹',
                raw: 'track missiles'
            },
            {
                local: '轨迹拖尾',
                raw: 'complex Trajectory'
            },
            {
                local: '坦克',
                raw: 'tank'
            },
            {
                local: '大炮',
                raw: 'cannon'
            },
            {
                local: '军用载具',
                raw: 'military_vehicle'
            },
            {
                local: '摩托车',
                raw: 'motorcycle'
            },
            {
                local: '船舶',
                raw: 'ship'
            },
            {
                local: '船舶',
                raw: 'watercraft'
            },
            {
                local: '汽车',
                raw: 'car'
            },
            {
                local: '机械',
                raw: 'machine'
            },
            {
                local: '机械武装',
                raw: 'machinery'
            },
            {
                local: '机械臂',
                raw: 'mechanical_arms'
            },
            {
                local: '机械化',
                raw: 'mechanization'
            },
            {
                local: '机械耳',
                raw: 'robot_ears'
            },
            {
                local: '机械关节',
                raw: 'robot_joints'
            },
            {
                local: '超时空要塞机体',
                raw: 'variable_fighter'
            },
            {
                local: '魔人经卷',
                raw: "sorcerer's_sutra_scroll"
            }
        ],
        食物: [
            {
                local: '寿司卷',
                raw: 'A_sushi_roll'
            },
            {
                local: '苹果',
                raw: 'apple'
            },
            {
                local: '茄子',
                raw: 'aubergine'
            },
            {
                local: '汉堡',
                raw: 'burger'
            },
            {
                local: '蛋糕',
                raw: 'cake'
            },
            {
                local: '糖果',
                raw: 'candy'
            },
            {
                local: '苹果糖',
                raw: 'candy_apple'
            },
            {
                local: '棒棒糖',
                raw: 'candy_cane'
            },
            {
                local: '胡萝卜',
                raw: 'carrot'
            },
            {
                local: '香烟',
                raw: 'cigarette'
            },
            {
                local: '咖啡',
                raw: 'coffee'
            },
            {
                local: '饼干',
                raw: 'cookie'
            },
            {
                local: '棉花糖',
                raw: 'cotton_candy_'
            },
            {
                local: '奶油',
                raw: 'cream'
            },
            {
                local: '团子',
                raw: 'dango'
            },
            {
                local: '甜甜圈',
                raw: 'doughnut'
            },
            {
                local: '饮料',
                raw: 'drink'
            },
            {
                local: '鸡蛋',
                raw: 'egg'
            },
            {
                local: '水果',
                raw: 'fruit'
            },
            {
                local: '明胶、布丁',
                raw: 'Gelatin'
            },
            {
                local: '冰激凌',
                raw: 'ice_cream'
            },
            {
                local: '卡夫奇诺',
                raw: 'kafuu_chino'
            },
            {
                local: '海苔卷寿司',
                raw: 'makizushi'
            },
            {
                local: '肉',
                raw: 'meat'
            },
            {
                local: '面条',
                raw: 'noodles'
            },
            {
                local: '便当',
                raw: 'obento'
            },
            {
                local: '饭团',
                raw: 'onigiri'
            },
            {
                local: '鬆餅',
                raw: 'pancake'
            },
            {
                local: '馅饼',
                raw: 'pasties'
            },
            {
                local: '桃子',
                raw: 'peach'
            },
            {
                local: '拉面',
                raw: 'ramen'
            },
            {
                local: '日本清酒',
                raw: 'sake'
            },
            {
                local: '鲷鱼烧',
                raw: 'taiyaki'
            },
            {
                local: '茶',
                raw: 'tea'
            },
            {
                local: '茶杯',
                raw: 'teacup'
            },
            {
                local: '和果子',
                raw: 'wagashi'
            },
            {
                local: '葡萄酒',
                raw: 'wine'
            },
            {
                local: '果酱',
                raw: 'jam'
            },
            {
                local: '百奇',
                raw: 'pocky'
            },
            {
                local: '瓶裝水',
                raw: 'bottled_water'
            },
            {
                local: '甘薯',
                raw: 'sweet_potato'
            },
            {
                local: '糖果',
                raw: 'sweets'
            },
            {
                local: '食物',
                raw: 'food'
            },
            {
                local: '嘴里有食物',
                raw: 'food_in_mouth'
            },
            {
                local: '脸上有食物',
                raw: 'food_on_'
            },
            {
                local: '身体上有食物',
                raw: 'food_on_body'
            },
            {
                local: '食物印花',
                raw: 'food_print'
            },
            {
                local: '食品摊',
                raw: 'food_stand'
            },
            {
                local: '(角色)在食物里',
                raw: 'in_food'
            },
            {
                local: '薯片',
                raw: 'chips'
            },
            {
                local: '薯片',
                raw: 'potato_chips'
            },
            {
                local: '泰事达牌足球',
                raw: 'telstar'
            },
            {
                local: '圣代',
                raw: 'sundae'
            },
            {
                local: '天妇罗',
                raw: 'tempura'
            }
        ],
        动物: [
            {
                local: '爬行动物',
                raw: 'reptile'
            },
            {
                local: '乌鸦',
                raw: 'crow'
            },
            {
                local: '鸟',
                raw: 'bird'
            },
            {
                local: '企鹅',
                raw: 'penguin'
            },
            {
                local: '小鸡',
                raw: 'chick'
            },
            {
                local: '蛮啾',
                raw: 'manjuu_(azur_lane)'
            },
            {
                local: '贝壳',
                raw: 'shell'
            },
            {
                local: '蠕动夜虫',
                raw: 'wriggle_nightbug'
            },
            {
                local: '蜻蜓',
                raw: 'dragonfly'
            },
            {
                local: '哺乳动物',
                raw: 'mammal'
            },
            {
                local: '狼',
                raw: 'wolf'
            },
            {
                local: '马',
                raw: '扶桑花'
            },
            {
                local: '鲸',
                raw: 'whale'
            },
            {
                local: '猫',
                raw: 'cat'
            },
            {
                local: '逗猫',
                raw: 'cat_teaser'
            },
            {
                local: '狗',
                raw: 'dog'
            },
            {
                local: '狗牌',
                raw: 'dog_tags'
            },
            {
                local: '狐狸',
                raw: 'fox'
            },
            {
                local: '兔子',
                raw: 'bunny'
            },
            {
                local: '雪兔',
                raw: 'snow_bunny'
            },
            {
                local: '兔子玩偶',
                raw: 'stuffed_bunny'
            },
            {
                local: '马',
                raw: 'horse'
            },
            {
                local: '牛',
                raw: 'cow'
            },
            {
                local: '龙',
                raw: 'dragon'
            },
            {
                local: '中国龙',
                raw: 'loong'
            },
            {
                local: '东方龙',
                raw: 'eastern_dragon'
            },
            {
                local: '蛇',
                raw: 'snake'
            },
            {
                local: '史莱姆',
                raw: 'slime'
            },
            {
                local: '熊',
                raw: 'bear'
            },
            {
                local: '熊猫',
                raw: 'panda'
            },
            {
                local: '泰迪熊',
                raw: 'teddy_bear'
            },
            {
                local: '老虎',
                raw: 'tiger'
            },
            {
                local: '蝙蝠',
                raw: 'bat'
            },
            {
                local: '仓鼠',
                raw: 'hamster'
            },
            {
                local: '老鼠',
                raw: 'mouse'
            },
            {
                local: '松鼠',
                raw: 'squirrel'
            }
        ],
        植物: [
            {
                local: '植物',
                raw: 'plant'
            },
            {
                local: '花',
                raw: 'flower'
            },
            {
                local: '花瓶',
                raw: 'vase'
            },
            {
                local: '花束',
                raw: 'bouquet'
            },
            {
                local: '花盛开',
                raw: 'flower_bloom'
            },
            {
                local: '梅花',
                raw: 'plum_blossom'
            },
            {
                local: '樱花',
                raw: 'cherry_blossoms'
            },
            {
                local: '紫藤',
                raw: 'wisteria'
            },
            {
                local: '芙蓉花',
                raw: 'hibiscus'
            },
            {
                local: '绣球花',
                raw: 'hydrangea'
            },
            {
                local: '玫瑰',
                raw: 'rose'
            },
            {
                local: '彼岸花',
                raw: 'spider_lily'
            },
            {
                local: '百合花',
                raw: 'lily'
            },
            {
                local: '莲花',
                raw: 'lotus'
            },
            {
                local: '竹',
                raw: 'bamboo'
            },
            {
                local: '缠结型植物',
                raw: 'entangled_plants'
            },
            {
                local: '兰花',
                raw: 'orchid'
            },
            {
                local: '菊花',
                raw: 'chrysanthemum'
            },
            {
                local: '水仙',
                raw: 'narcissu'
            },
            {
                local: '树',
                raw: 'tree'
            },
            {
                local: '树枝',
                raw: 'branch'
            },
            {
                local: '森林',
                raw: 'forest'
            },
            {
                local: '松树',
                raw: 'pine_tree'
            },
            {
                local: '棕榈树',
                raw: 'palm_tree'
            },
            {
                local: '枫树',
                raw: 'maple_tree'
            },
            {
                local: '灌木',
                raw: 'bush/shrub,'
            },
            {
                local: '圣诞树',
                raw: 'christmas_tree'
            },
            {
                local: '枫叶',
                raw: 'maple_leaf'
            },
            {
                local: '南瓜',
                raw: 'pumpkin'
            },
            {
                local: '南瓜灯',
                raw: "jack-o'-lantern"
            },
            {
                local: '大葱',
                raw: 'spring_onion'
            }
        ]
    },
    镜头: {
        镜头: [
            {
                local: '全景',
                raw: 'panorama'
            },
            {
                local: '风景镜头(远景)',
                raw: 'landscape'
            },
            {
                local: '全景镜头(广角镜头)',
                raw: 'wide_shot'
            },
            {
                local: '中景镜头',
                raw: 'medium_shot'
            },
            {
                local: '中景镜头',
                raw: 'mid_shot'
            },
            {
                local: '全身像',
                raw: 'full_shot'
            },
            {
                local: '半身像',
                raw: 'bust'
            },
            {
                local: '上半身',
                raw: 'upper_body'
            },
            {
                local: '下半身',
                raw: 'lower_body'
            },
            {
                local: '上半身+上半大腿(牛仔镜头)',
                raw: 'cowboy_shot'
            },
            {
                local: '肖像画(脸+肩+偶尔再加胸)',
                raw: 'portrait'
            },
            {
                local: '侧面肖像画(portrait的侧脸版)',
                raw: 'profile'
            }
        ],
        特写镜头: [
            {
                local: '特写镜头',
                raw: 'close-up'
            },
            {
                local: '微距镜头',
                raw: 'macro_shot'
            },
            {
                local: '插入其他镜头或图片',
                raw: 'inset'
            },
            {
                local: '剖面图',
                raw: 'cross-section'
            },
            {
                local: 'X射线',
                raw: 'x-ray'
            },
            {
                local: '聚焦在单个人物(适合复杂场景)',
                raw: 'solo_focus'
            },
            {
                local: '聚焦在xx上',
                raw: 'xx_focus'
            },
            {
                local: '聚焦在面部',
                raw: 'face_focus'
            },
            {
                local: '聚焦在眼睛',
                raw: 'eyes_focus'
            },
            {
                local: '聚焦在脚上',
                raw: 'foot_focus'
            },
            {
                local: '聚焦在臀部',
                raw: 'hip_focus'
            },
            {
                local: '聚焦在屁股上',
                raw: 'ass_focus'
            },
            {
                local: '聚焦在载具上',
                raw: 'vehicle_focus'
            },
            {
                local: '(强调)两腿之间',
                raw: 'between_legs'
            },
            {
                local: '(突出)胸部',
                raw: 'between_breasts'
            },
            {
                local: '(突出)指间',
                raw: 'between_fingers'
            },
            {
                local: '偷窥',
                raw: 'peeking'
            },
            {
                local: '偷窥(的姿态)',
                raw: 'peeking_out'
            },
            {
                local: '偷窥(强调视角)',
                raw: 'peeping'
            },
            {
                local: '肚脐偷看',
                raw: 'midriff_peek'
            },
            {
                local: '腋窝偷看',
                raw: 'armpit_peek'
            },
            {
                local: '浦西偷看',
                raw: 'pussy_peek'
            },
            {
                local: '内裤偷看',
                raw: 'panty_peek'
            },
            {
                local: '内裤走光',
                raw: 'pantyshot'
            },
            {
                local: '被抓现行',
                raw: 'caught'
            }
        ],
        其他构图: [
            {
                local: '空中',
                raw: 'aerial'
            },
            {
                local: '转身',
                raw: "turn_one's_back"
            },
            {
                local: '裙底视角',
                raw: 'upskirt'
            },
            {
                local: '手机屏幕',
                raw: 'phone_screen'
            },
            {
                local: '多视角分解',
                raw: 'multiple_views'
            },
            {
                local: '对镜自拍',
                raw: 'mirror selfie'
            },
            {
                local: '3/4视角',
                raw: 'three-quarter view'
            }
        ],
        镜头角度: [
            {
                local: '正面视角',
                raw: 'front view'
            },
            {
                local: '侧面视角',
                raw: 'from_side'
            },
            {
                local: '从上方↘',
                raw: 'from_above'
            },
            {
                local: '从下方↗',
                raw: 'from_below'
            },
            {
                local: '由室外向室内',
                raw: 'from_outside'
            },
            {
                local: '后背视角',
                raw: 'from_back'
            },
            {
                local: '后背视角',
                raw: 'from behind'
            },
            {
                local: '动态角度',
                raw: 'dynamic_angle'
            },
            {
                local: '电影角度',
                raw: 'cinematic_angle'
            },
            {
                local: '倾斜角度',
                raw: 'dutch angle'
            },
            {
                local: '透视法',
                raw: 'foreshortening'
            },
            {
                local: '远景透视画法',
                raw: 'fisheye'
            }
        ],
        效果: [
            {
                local: '景深（协调人景）',
                raw: 'depth of field'
            },
            {
                local: '镜头光晕',
                raw: 'lens_flare'
            },
            {
                local: '运动导致的模糊',
                raw: 'motion_blur'
            },
            {
                local: '体现运动的线',
                raw: 'motion_lines'
            },
            {
                local: '速度线',
                raw: 'speed_lines'
            },
            {
                local: '焦散',
                raw: 'bokeh'
            },
            {
                local: '色差',
                raw: 'chromatic_aberration'
            },
            {
                local: '过曝',
                raw: 'overexposure'
            },
            {
                local: '等高线强化',
                raw: 'contour_deepening'
            }
        ],
        主角动作: [
            {
                local: '看向观众',
                raw: 'looking_at_viewer'
            },
            {
                local: '眼神接触',
                raw: 'eye-contact'
            },
            {
                local: '盯着看',
                raw: 'eyeball'
            },
            {
                local: '凝视',
                raw: 'stare'
            },
            {
                local: '回眸',
                raw: 'looking_back'
            },
            {
                local: '人物倾斜',
                raw: 'gradient'
            },
            {
                local: '人物视角向下看↘',
                raw: 'looking_down'
            },
            {
                local: '人物视角抬头看↗',
                raw: 'looking_up'
            },
            {
                local: '面向别处',
                raw: 'facing_away'
            },
            {
                local: '看向侧面',
                raw: 'looking_to_the_side'
            },
            {
                local: '看着别处',
                raw: 'looking_away'
            },
            {
                local: '展望未来',
                raw: 'looking_ahead'
            },
            {
                local: '遥望',
                raw: 'looking_afar'
            },
            {
                local: '向外看',
                raw: 'looking_outside'
            },
            {
                local: '歪头',
                raw: 'head_tilt'
            },
            {
                local: '低头',
                raw: 'head_down'
            },
            {
                local: '轻轻向侧面瞥',
                raw: 'sideways_glance'
            },
            {
                local: '从衬衫下方瞥',
                raw: 'upshirt'
            },
            {
                local: '从裙底瞥',
                raw: 'upshorts'
            },
            {
                local: '看着另一个',
                raw: 'looking_at_another'
            },
            {
                local: '看手机',
                raw: 'looking_at_phone'
            },
            {
                local: '看着动物',
                raw: 'looking_at_animal'
            },
            {
                local: '照镜子',
                raw: 'looking_at_mirror'
            },
            {
                local: '看着手',
                raw: 'looking_at_hand'
            },
            {
                local: '看着双手',
                raw: 'looking_at_hands'
            },
            {
                local: '看食物',
                raw: 'looking_at_food'
            },
            {
                local: '看着屏幕',
                raw: 'looking_at_screen'
            }
        ]
    },
    汉服: {
        '唐风:': [
            {
                local: '唐风',
                raw: 'hanfu, tang style outfits,<lora:hanfuTang_v32:0.7>'
            }
        ],
        上杉: [
            {
                local: '橙色上杉',
                raw: 'orange upper shan'
            },
            {
                local: '红色上杉',
                raw: 'red upper shan'
            },
            {
                local: '绿色上杉',
                raw: 'green upper shan'
            },
            {
                local: '蓝色上杉',
                raw: 'blue upper shan'
            },
            {
                local: '粉色上杉',
                raw: 'pink upper shan'
            },
            {
                local: '黄色上杉',
                raw: 'yellow upper shan'
            },
            {
                local: '白色上杉',
                raw: 'white upper shan'
            },
            {
                local: '淡蓝上杉',
                raw: 'light blue upper shan'
            },
            {
                local: '浅绿上杉',
                raw: 'light green upper shan'
            },
            {
                local: '浅红上杉',
                raw: 'light red upper shan'
            },
            {
                local: '青蓝上杉',
                raw: 'cyan blue upper shan'
            },
            {
                local: '浅紫上杉',
                raw: 'light purple upper shan'
            },
            {
                local: '黑蓝上杉',
                raw: 'black with blue upper shan'
            },
            {
                local: '橙白上杉',
                raw: 'white with orange upper shan'
            },
            {
                local: '粉黑上杉',
                raw: 'pink with black upper shan'
            }
        ],
        长上杉: [
            {
                local: '橙色',
                raw: 'orange long upper shan'
            },
            {
                local: '红色',
                raw: 'red long upper shan'
            },
            {
                local: '绿色',
                raw: 'green long upper shan'
            },
            {
                local: '蓝色',
                raw: 'blue long upper shan'
            },
            {
                local: '粉色',
                raw: 'pink long upper shan'
            },
            {
                local: '黄色',
                raw: 'yellow long upper shan'
            },
            {
                local: '白色',
                raw: 'white long upper shan'
            },
            {
                local: '淡蓝',
                raw: 'light blue long upper shan'
            },
            {
                local: '浅绿',
                raw: 'light green long upper shan'
            },
            {
                local: '浅红',
                raw: 'light red long upper shan'
            },
            {
                local: '青蓝',
                raw: 'cyan blue long upper shan'
            },
            {
                local: '浅紫',
                raw: 'light purple long upper shan'
            },
            {
                local: '黑蓝',
                raw: 'black with blue long upper shan'
            },
            {
                local: '橙白',
                raw: 'white with orange long upper shan'
            },
            {
                local: '粉黑',
                raw: 'pink with black long upper shan'
            }
        ],
        齐胸破裙: [
            {
                local: '白色破裙',
                raw: 'white chest po skirt'
            },
            {
                local: '红色破裙',
                raw: 'red chest po skirt'
            },
            {
                local: '绿色破裙',
                raw: 'green chest po skirt'
            },
            {
                local: '蓝色破裙',
                raw: 'blue chest po skirt'
            },
            {
                local: '粉色破裙',
                raw: 'pink chest po skirt'
            },
            {
                local: '紫色破裙',
                raw: 'purple chest po skirt'
            },
            {
                local: '彩色破裙',
                raw: 'multicolour chest po skirt'
            },
            {
                local: '紫白破裙',
                raw: 'purple with white chest po skirt'
            },
            {
                local: '黄白破裙',
                raw: 'white with yellow chest po skirt'
            },
            {
                local: '天蓝破裙',
                raw: 'blue with white chest po skirt'
            },
            {
                local: '橙白破裙',
                raw: 'orange with white chest po skirt'
            },
            {
                local: '灰豆绿破裙',
                raw: 'green with white chest po skirt'
            },
            {
                local: '淡黄白破裙',
                raw: 'light orange with white chest po skirt'
            },
            {
                local: '粉白破裙',
                raw: 'pink with white chest po skirt'
            },
            {
                local: '白偏粉破裙',
                raw: 'white with pink chest po skirt'
            }
        ],
        齐胸褶裙: [
            {
                local: '白色褶裙',
                raw: 'white chest pleated skirt'
            },
            {
                local: '红色褶裙',
                raw: 'red chest pleated skirt'
            },
            {
                local: '绿色褶裙',
                raw: 'green chest pleated skirt'
            },
            {
                local: '蓝色褶裙',
                raw: 'blue chest pleated skirt'
            },
            {
                local: '粉色褶裙',
                raw: 'pink chest pleated skirt'
            },
            {
                local: '紫色褶裙',
                raw: 'purple chest pleated skirt'
            },
            {
                local: '彩色褶裙',
                raw: 'multicolour chest pleated skirt'
            },
            {
                local: '紫白褶裙',
                raw: 'purple with white chest pleated skirt'
            },
            {
                local: '黄白褶裙',
                raw: 'white with yellow chest pleated skirt'
            },
            {
                local: '天蓝褶裙',
                raw: 'blue with white chest pleated skirt'
            },
            {
                local: '橙白褶裙',
                raw: 'orange with white chest pleated skirt'
            },
            {
                local: '灰豆绿褶裙',
                raw: 'green with white chest pleated skirt'
            },
            {
                local: '淡黄白褶裙',
                raw: 'light orange with white chest pleated skirt'
            },
            {
                local: '粉白褶裙',
                raw: 'pink with white chest pleated skirt'
            },
            {
                local: '白偏粉褶裙',
                raw: 'white with pink chest pleated skirt'
            }
        ],
        系带: [
            {
                local: '绿色系带',
                raw: 'green waistband'
            },
            {
                local: '黄色系带',
                raw: 'yellow waistband'
            },
            {
                local: '红色系带',
                raw: 'red waistband'
            },
            {
                local: '粉色系带',
                raw: 'pink waistband'
            },
            {
                local: '橙色系带',
                raw: 'orange waistband'
            },
            {
                local: '淡蓝系带',
                raw: 'light blue waistband'
            },
            {
                local: '绿白系带',
                raw: 'light green waistband'
            },
            {
                local: '黄绿系带',
                raw: 'green with yellow waistband'
            },
            {
                local: '紫白系带',
                raw: 'purple with white waistband'
            },
            {
                local: '红白系带',
                raw: 'red with white waistband'
            },
            {
                local: '红黑系带',
                raw: 'red with black waistband'
            },
            {
                local: '黄白系带',
                raw: 'yellow with white waistband'
            }
        ],
        披帛: [
            {
                local: '白色披帛',
                raw: 'white pibo'
            },
            {
                local: '橙色披帛',
                raw: 'orange pibo'
            },
            {
                local: '黑色披帛',
                raw: 'black pibo'
            },
            {
                local: '粉色披帛',
                raw: 'pink pibo'
            },
            {
                local: '红色披帛',
                raw: 'red pibo'
            },
            {
                local: '紫色披帛',
                raw: 'purple pibo'
            },
            {
                local: '浅绿披帛',
                raw: 'light green pibo'
            },
            {
                local: '黄白披帛',
                raw: 'white with yellow pibo'
            }
        ],
        '宋风:': [
            {
                local: '宋风',
                raw: 'hanfu, song style outfits,<lora:hanfuSong_v31:0.7>'
            }
        ],
        短衫: [
            {
                local: '紫色短杉',
                raw: 'purple short shan'
            },
            {
                local: '红色短杉',
                raw: 'red short shan'
            },
            {
                local: '绿色短杉',
                raw: 'green short shan'
            },
            {
                local: '蓝色短杉',
                raw: 'blue short shan'
            },
            {
                local: '粉色短杉',
                raw: 'pink short shan'
            },
            {
                local: '黄色短杉',
                raw: 'yellow short shan'
            },
            {
                local: '白色短杉',
                raw: 'white short shan'
            },
            {
                local: '淡蓝短杉',
                raw: 'light blue short shan'
            },
            {
                local: '浅绿短杉',
                raw: 'light green short shan'
            },
            {
                local: '浅红短杉',
                raw: 'light red short shan'
            },
            {
                local: '青蓝短杉',
                raw: 'cyan blue short shan'
            },
            {
                local: '浅紫短杉',
                raw: 'light purple short shan'
            },
            {
                local: '黑蓝短杉',
                raw: 'black with blue short shan'
            },
            {
                local: '黄白短杉',
                raw: 'white with yellow short shan'
            },
            {
                local: '浅黄白绿短',
                raw: 'light yellow with green with white short shan'
            }
        ],
        长衫: [
            {
                local: '紫色长杉',
                raw: 'purple long shan'
            },
            {
                local: '红色长杉',
                raw: 'red long shan'
            },
            {
                local: '绿色长杉',
                raw: 'green long shan'
            },
            {
                local: '蓝色长杉',
                raw: 'blue long shan'
            },
            {
                local: '粉色长杉',
                raw: 'pink long shan'
            },
            {
                local: '黄色长杉',
                raw: 'yellow long shan'
            },
            {
                local: '白色长杉',
                raw: 'white long shan'
            },
            {
                local: '淡蓝长杉',
                raw: 'light blue long shan'
            },
            {
                local: '浅绿长杉',
                raw: 'light green long shan'
            },
            {
                local: '浅红长杉',
                raw: 'light red long shan'
            },
            {
                local: '青蓝长杉',
                raw: 'cyan blue long shan'
            },
            {
                local: '浅紫长杉',
                raw: 'light purple long shan'
            },
            {
                local: '黑蓝长杉',
                raw: 'black with blue long shan'
            },
            {
                local: '黄白长杉',
                raw: 'white with yellow long shan'
            },
            {
                local: '浅黄白绿长',
                raw: 'light yellow with green with white long shan'
            }
        ],
        百褶裙: [
            {
                local: '白裙',
                raw: 'white pleated skirt'
            },
            {
                local: '红裙',
                raw: 'red pleated skirt'
            },
            {
                local: '绿裙',
                raw: 'green pleated skirt'
            },
            {
                local: '蓝裙',
                raw: 'blue pleated skirt'
            },
            {
                local: '粉裙',
                raw: 'pink pleated skirt'
            },
            {
                local: '浅蓝裙',
                raw: 'light blue pleated skirt'
            },
            {
                local: '白金裙',
                raw: 'white golden pleated skirt'
            },
            {
                local: '渐变绿裙',
                raw: 'gradient green pleated skirt'
            },
            {
                local: '半透白裙',
                raw: 'translucent white pleated skirt'
            },
            {
                local: '红青渐变',
                raw: 'red cyan gradient pleated skirt'
            },
            {
                local: '红绿渐变',
                raw: 'red green gradient pleated skirt'
            },
            {
                local: '白绿相间',
                raw: 'green with white pleated skirt'
            },
            {
                local: '浅黄绿相间',
                raw: 'light yellow with green with white pleated skirt'
            }
        ],
        宋抹: [
            {
                local: '橙色宋抹',
                raw: 'orange songmo'
            },
            {
                local: '红色宋抹',
                raw: 'red songmo'
            },
            {
                local: '绿色宋抹',
                raw: 'green songmo'
            },
            {
                local: '蓝色宋抹',
                raw: 'blue songmo'
            },
            {
                local: '粉色宋抹',
                raw: 'pink songmo'
            },
            {
                local: '黄色宋抹',
                raw: 'yellow songmo'
            },
            {
                local: '白色宋抹',
                raw: 'white songmo'
            },
            {
                local: '紫色宋抹',
                raw: 'purple songmo'
            },
            {
                local: '绿碎花宋抹',
                raw: 'green floral songmo'
            },
            {
                local: '紫碎花宋抹',
                raw: 'purple floral songmo'
            },
            {
                local: '青碎花宋抹',
                raw: 'cyan floral songmo'
            }
        ],
        '明风:': [
            {
                local: '明风',
                raw: 'hanfu, ming style outfits,<lora:hanfuMing_v31:0.7>'
            }
        ],
        上衣: [
            {
                local: '短袄',
                raw: 'short coat'
            },
            {
                local: '长袄',
                raw: 'long coat'
            }
        ],
        裙子: [
            {
                local: '马面裙',
                raw: 'mamian skirt'
            }
        ],
        领子: [
            {
                local: '交领',
                raw: 'overlapping collar'
            },
            {
                local: '圆领',
                raw: 'round collar'
            },
            {
                local: '立领',
                raw: 'standing collar'
            },
            {
                local: '方领',
                raw: 'square collar'
            }
        ],
        装饰: [
            {
                local: '云肩',
                raw: 'overlapping collar'
            },
            {
                local: '刺绣',
                raw: 'embroidery'
            },
            {
                local: '织金',
                raw: 'woven gold'
            },
            {
                local: '妆花',
                raw: 'makeup flower'
            },
            {
                local: '补服',
                raw: 'bufu'
            }
        ]
    },
    魔法系: {
        '魔法1.0': [
            {
                local: '水魔法',
                raw: '((water drops)),wet clothes,((beautiful detailed water)),((floating)),dynamic angle'
            },
            {
                local: '冰魔法',
                raw: 'beautiful detailed glow, (detailed ice), beautiful detailed water'
            },
            {
                local: '冰系改',
                raw: 'beautiful detailed glow,detailed ice,beautiful detailed water,(floating palaces:1.2),(ice crystal texture wings),（Iridescence and rainbow hair:2.5）'
            },
            {
                local: '星冰乐',
                raw: 'beautiful detailed glow,detailed ice,beautiful detailed water, (floating palaces:1.3),(((ice crystal texture wings)))'
            },
            {
                local: '森林冰',
                raw: '((detailed beautiful snow forest with trees)), ((snowflakes)), floating'
            },
            {
                local: '结晶法',
                raw: '(((crystals texture Hair))),((beautiful detailed glass hair)),((glass shaped texture hand)),((crystallize texture body)),gem body,hands as clear as jewels,crystallization of clothes,((crystals texture skin)),sparkle, lens flare, light leaks,broken glass,detailed glass shaped clothes,beautiful detailed gemstone sky, gemstone sea, crystals texture flowers,((detailed crystallized clothing))'
            },
            {
                local: '核爆法',
                raw: 'beautiful detailed glow,((flames of war)),(((nuclear explosion behide)))'
            },
            {
                local: '风魔法',
                raw: '((breeze)), flying splashes, flying petals, wind'
            },
            {
                local: '流沙法',
                raw: '((surrounded by heavy floating sand flow and floating sharp stones)),((((ink)))),((illustration)),((watercolor))'
            },
            {
                local: '雷电法',
                raw: '(detailed light), ((lightning in hand)),lightning surrounds,(((lightning chain)))'
            },
            {
                local: '圣光法',
                raw: '(sunlight),(angel),dynamic angle, floating, wing, halo, floating white silk,(Holy Light),silver stars'
            },
            {
                local: '苇名法',
                raw: 'beautiful detailed pampas grass field, open hakama, surrounded by floating sakura, yellow full moon, beautiful detailed dark midnight sky, messy white long hair'
            },
            {
                local: '自然法',
                raw: 'beautiful and delicate water, the finest grass, very delicate light, nature, painting, water spray, breeze, flowers and grass meadow, near the water edge, (sunset, starry sky in a circle), randomly distributed clouds, river, splashing water, falling petals'
            },
            {
                local: '森林法',
                raw: '(detailed light) , feather, leaves, nature, (sunlight), river, (forest),(bloom)'
            },
            {
                local: '虹彩法',
                raw: 'floating and rainbow long hair,Iridescence and rainbow, beautiful detailed starry sky'
            },
            {
                local: '暗锁法',
                raw: 'chain ring, chain storm, dark chain,((wholeblack bloomer)), darkside, night, deep dark, darkness, ((dark clouds)),((ruins)),shadow, death garden'
            },
            {
                local: '火烧云',
                raw: 'beautiful detailed glow, floating ashes, beautiful and detailed explosion, red moon, fire, fire cloud, wings on fire, a cloudy sky, smoke of gunpowder, burning, black dress, dove of peace, (floating cloud:1.2)'
            },
            {
                local: '城堡法',
                raw: 'beautiful detailed glow, detailed ice, beautiful detailed water, (magic circle:1.2), (floating palaces:1.3)'
            },
            {
                local: '黄昏法',
                raw: '(water bloom), (delicate glow), (breeze), long Flowers meadow,(((sunset)), (less stars form a circle), randomly distributed clouds, (rivers), (willows with branches falling into the water)'
            },
            {
                local: '泡泡法',
                raw: '((colorful bubble)),(floating),detailed light'
            },
            {
                local: '蔷薇法',
                raw: '((rose)), (vine), cage, bandage, red rope, (detail light), falling rose petals'
            },
            {
                local: '星空法',
                raw: '(starry tornado:1.4), starry Nebula, beautiful detailed sky'
            },
            {
                local: '月亮法',
                raw: '((moon)), starry sky, (lighting particle), fog, snow,(bloom)'
            },
            {
                local: '雪月法',
                raw: 'beautiful detailed glow, detailed ice, beautiful detailed water, (cold full moon), snowflake, (floating cloud:1.2)'
            },
            {
                local: '森火法',
                raw: '((burning forest)), spark, light leaks, burning sky, flame, flames burning around, (flying sparks)'
            },
            {
                local: '废土法',
                raw: '((destroyed)),explosion, buildings in disarray, The residual eaves DuanBi, cumulus, mouldy, floating, wind, Dead end machine,(broken robot),(Mechanical robot girl), in the rubble of a devastated city'
            },
            {
                local: '战甲法',
                raw: 'mecha clothes, robot girl, sliver bodysuit,((sliver)) and (broken) body'
            },
            {
                local: '黄金法',
                raw: 'Extremely gorgeous metal style, Metal crown with ornate stripes, Various metals background, Sputtered molten iron, floating hair, Hair like melted metal, Clothes made of silver, Clothes with gold lace, flowing gold and silver, everything flowing and melt, flowing iron, flowing silver, lace flowing and melt'
            },
            {
                local: '机娘法',
                raw: 'mecha clothes, robot girl'
            },
            {
                local: '死灵法',
                raw: 'ink,(((bone))), (((ribs))), rose, black hair, blue eyes, greyscale, no shadow, simple background, bright skin'
            },
            {
                local: '水晶法',
                raw: '(((gorgeous crystal armor))),(((crystal wings))),((altocumulus)),(clear_sky),(snow mountain),((flowery flowers)),(flowery bubbles),cloud map plane, crystal, crystal poppies,Brilliant light, thick_coating, glass tint,(watercolor)'
            },
            {
                local: '水森法',
                raw: '((an extremely delicate and beautiful)),floating, (detailed wet clothes), (detailed light),feather, nature, (sunlight), river, floating palace, beautiful and delicate water,(bloom),(shine)'
            },
            {
                local: '冰火法',
                raw: '(blue spark),(red and blue hair),blue eyes, burning sky,flame,Rainbow in the sky,((Flames burning ice)),(((fire butterflies))),(((ice crystal texture wings))),(Flying sparks),(detailed ice),((a lot of luminous ice crystals)),((burning feathers)),(feathers made of ice),(frozen feathers),(((ice and fire together)))'
            },
            {
                local: '龙骑士',
                raw: '(anger), dragon horns, (silver armor), metal, complex pattern, cape, indifference'
            },
            {
                local: '坠落法',
                raw: '((full body)),(helpless),tear, crying,(((((falling from the sky))))),((Weathering With You)),((falling)),((face towards the sky))，(hair flows upwards),((disheveled hair)),(1 girl), floating, beautiful detailed sky'
            },
            {
                local: '水下法',
                raw: '((underwater)),(beautiful detailed water),((coral)),dynamic angle, floating,(detailed light),floating hair,(splash),((fishes)),leaves dress, feather, nature,(sunlight),(underwater forest),(bloom),(detailed glow),drenched, seaweed, fish,(((Tyndall effect)))'
            },
            {
                local: '秘境法',
                raw: '(extremely detailed CG unity 8k wallpaper),(((masterpiece))), (((best quality))), ((ultra-detailed)), (best illustration),(best shadow), ((an extremely delicate and beautiful)),dynamic angle,floating, fairyland,dynamic angle,sea of flowers,beautiful detailed garden,wind,classic,spring, (detailed light),feather, nature, (sunlight), river, forest,(((floating palace))),((the best building)),beautiful and delicate water,(painting),(sketch),(bloom),(shine)'
            },
            {
                local: '摄影法',
                raw: '(((masterpiece))), ((the best quality, super fine illustrations, beautiful and delicate water)), ((very delicate light)), ((nature, painting)), ((fine lighting, more transparent stars, high-quality snowflakes, high-quality mountains, very fine 8KCG wallpapers)), (plateau), (((snow mountain))), sunrise, randomly distributed clouds, (snow field), cliff, ((rotating star sky)), ((lake in mountain stream)), luminous particles'
            },
            {
                local: '摩登法',
                raw: '1980s (style),simple background, retro artstyle'
            },
            {
                local: '血魔法',
                raw: '(white hair), red long hair, red eyes, (full body), (((with sword))), angry face, (beautiful detailed eyes), Blood drop,Blood fog, floating hair, disheveled hair, Splashing blood,(Bloodstain)'
            },
            {
                local: '唤龙术',
                raw: '((dragon)), ((dragon background))'
            },
            {
                local: '战姬法',
                raw: 'hair fluttering in the wind,((mechanical arm armor)),((mechanical body armor)),riding motor, bodysuit,((ruins of city in war, fire, burning cars, burning buildings)),air force fleet in the sky'
            },
            {
                local: '龙机法',
                raw: 'mecha clothes, robot girl, sliver bodysuit, dragon wings, ((a dragon stands behind the girl)), beautiful detailed sliver dragon armor'
            },
            {
                local: '星蝶术',
                raw: '((Beautiful butterflies in detail)),((Beautiful stars in detail)),(((halter dress ))),particle,(Starry sky in beautiful detail),(Hazy fog),(Ruins of beautiful details),(((Standing on the surface of the sea)))'
            },
            {
                local: '学院法',
                raw: 'blonde wavy hair, (shiny long hair), ((Gothic Lolita)), blue white skirt, ((short skirt)), black Headdress, bowknot, (((hair ornament))), (hair flower), Lace, cross-laced footwear, ribbon-trimmed sleeves, building architecture, ((gothic architecture)), starry sky, outdoors, church, (castle)'
            },
            {
                local: '星霞海',
                raw: 'walking, waves, wind,(((glistening light of waves))),(detailed sunset glow),(floating flow),((coral)),(Luminous),coast,(floating colorful bubbles),beautiful detailed sky,(fluorescence),detailed shadow,(conch),beautiful detailed water, starfish, meteor, rainbow,(seabirds),(glinting stars), (glowworm),(splash),detailed cloud, shell,(fireworks)'
            },
            {
                local: '冬雪法',
                raw: 'beautiful detailed sky, night, stars, (red plum blossom),((winter)),(((snowflakes))), ((red and white flowers))，(starry sky),(sitting),((colorful)),scenery, lantern,(starfall)'
            }
        ],
        '魔法1.5': [
            {
                local: '万物熔炉',
                raw: '((((melt)))),(((((black and white melt))))),(((wear Black and white Taoist robes))),((((gold and silver lace)))),(((gold and silver lace lace))),(((flowing ((black)) and white background))),extremely detailed gorgeous tiara'
            },
            {
                local: '暗鸦法',
                raw: 'Floating black ashes, Beautiful and detailed black, red moon, ((The black clouds)), (black Wings) , a black cloudy sky, burning, black dress, ((Black fog)), Red eyes, (black smoke), ((Black feathers floating in the air)),bat, (floating black cloud:1.5),'
            },
            {
                local: '花火基础',
                raw: 'dynamic angle, finely detail, (bloom), (shine), glinting stars, ((((best detailed fireworks)))), ((((depth of field)))), (((hanabi))),(((backlight))),'
            },
            {
                local: '星之彩',
                raw: 'stars in the eyes, messy floating hair, colored inner hair, Starry sky adorns hair, (lots of big colorful Bubble), (pearl), (Galaxy), depth of field'
            },
            {
                local: '沉入星海',
                raw: 'stars in the eyes, messy floating hair, colored inner hair, Starry sky adorns hair, depth of field'
            },
            {
                local: '百溺法',
                raw: 'dynamic angle, detailed wet clothes, blank stare, overexplosure, floating, black long straight, red eyes, aqua eyes, gradient eyes, ((blood)), white dress, frills, ((expressionless)), extremely beautiful detailed water, ((lying on the lake)), (bloodred water:1.5), (red background:1.3)'
            },
            {
                local: '辉煌阳光法',
                raw: '((messy hair)),(grassland),(yellow eyes),incredibly absurdres,(gold hair),floating hair,Large number of environments,the medieval ,grace,prospect,water eyes,wind,breeze,god ray,lawn,Mountains and lakes in the distance,The sun shines through the trees,A vast expanse of grassland'
            },
            {
                local: '星鬓法',
                raw: 'Starry sky adorns hair, sparkling anime eyes,beautiful detailed stars,blighting stars,emerging dark purple across with white hair,multicolored hair,beautiful detailed sky, beautiful detailed water, cinematic lighting, dramatic angle,'
            },
            {
                local: '森罗法',
                raw: 'There are many scattered luminous petals,Hidden in the light yellow flowers,Depth of field,Many flying drops of water,Many scattered leaves,branch ,angle ,contour deepening,cinematic angle'
            },
            {
                local: '星天使',
                raw: 'sunlight, extremely light, extremely clothes, Holy Light, dynamic angle, Light particle, very long hair, white hair, yellow eyes, glowing eyes, expressionless, ((light smile)), ((((white Tulle skirt)))), white silk, looking at viewer, angel wings, large wings, multiple wings, angel halo, (((starry sky))), dusk sky, Floating light spot, Lots of feathers'
            },
            {
                local: '黄金律',
                raw: 'blonde hair, yellow eyes, white skin, mature female, sunrise, golden sky, magnificent architecture, beautiful detailed sky, overexposure, delicate gold metal decorations'
            },
            {
                local: '机械姬',
                raw: 'mechanical prosthesis,mecha coverage,emerging dark purple across with white hair,fluorescent purple,cool movement,rose red eyes,beatiful detailed cyberpunk city, hd semirealistic anime cg concept art digital painting'
            },
            {
                local: '人鱼法',
                raw: '(incredibly absurdres), (highly detailed beautiful fishtail:1.6), (((human hands))), (the lower body is a fish:1.9)AND(no human thigh:1.2), seaweed, (full body), (white seashell), (curved and slender fish tail), (the lower body is bare:1.1), {beautiful tailfin}, ((underwater)), (illustration), detailed water, ((fishes)), (floating), watercolor (medium), (small whirlpool), ((The sensation of water flowing)), (detailed scales on a mermaid)'
            },
            {
                local: '末日',
                raw: 'Blood Mist, background Urban rooftop,despair,Blood Cherry Blossom,torn clothes,crying with eyes open,solo,Blood Rain,bandages,Gunpowder smoke,beautiful deatailed shadow, Splashing blood,dust,tyndall effect'
            },
            {
                local: '碎梦',
                raw: 'Space opera,Space port,robot arm,elbow gloves,night,glisten,stare,cyberpunk,((((citylight)))),science fiction,bodysuit,Mechanical armor headdress,(bare shoulders)'
            },
            {
                local: '幻碎梦',
                raw: 'dynamic angle,rainbow hair,detailed cute anime face,((loli)),flower,cry,water,corrugated,flowers tire,broken glass,(broken screen),atlantis,transparent glass'
            },
            {
                local: '血改法',
                raw: '(white hair),(((red streaked hair))), red eyes, (((full body))),(red hair), (((((Hold a red sword))))), (angry face),((Blood drop)),((Blood fog)),light shafts, soft focus, ((Splashing blood))),Long hair,((Bloodstain)),Fighting stance,{{{{{watercolor (medium)}}}},(((masterpiece))),((white clock)),((ultradetailed)),((Covered in blood)),flowing hair,Exquisite Flame,dynamic angle, floating, (shine), extremely delicate and beautiful girls, bright skin, lying red petals,Holy lighting'
            },
            {
                local: '留影术',
                raw: 'dramatic shadows,black and white,monochrome,{{comic}},cross necklace,Cassock'
            },
            {
                local: '飘花法',
                raw: '((ink)),(water color),bloom effect,detailed beautiful grassland with petal,flower,butterfly,necklace,smile,petal,(((surrounded by heavy floating petal flow)))'
            }
        ]
    },
    反向提示词: {
        画面: [
            {
                local: 'Not Safe For Work',
                raw: 'NSFW'
            },
            {
                local: '商标',
                raw: 'logo'
            },
            {
                local: '文字',
                raw: 'text'
            },
            {
                local: '模糊',
                raw: 'blurry'
            },
            {
                local: '低质量',
                raw: 'low quality'
            },
            {
                local: '错误的解剖',
                raw: 'bad anatomy'
            },
            {
                local: '素描',
                raw: 'sketches'
            },
            {
                local: '低分辨率',
                raw: 'lowres'
            },
            {
                local: '正常质量',
                raw: 'normal quality'
            },
            {
                local: '单色',
                raw: 'monochrome'
            },
            {
                local: '灰度',
                raw: 'grayscale'
            },
            {
                local: '最差质量',
                raw: 'worstquality'
            },
            {
                local: '签名',
                raw: 'signature'
            },
            {
                local: '水印',
                raw: 'watermark'
            },
            {
                local: '裁剪',
                raw: 'cropped'
            },
            {
                local: '错误的比例',
                raw: 'bad proportions'
            },
            {
                local: '脱离焦点',
                raw: 'out of focus'
            },
            {
                local: '用户名',
                raw: 'username'
            }
        ],
        人: [
            {
                local: '多人',
                raw: 'Multiple people'
            },
            {
                local: '移除成年人',
                raw: '(AS-YoungV2-Neg:1.3)'
            },
            {
                local: '移除年轻人',
                raw: '(AS-Adult-Neg:1.3)'
            },
            {
                local: '坏身体',
                raw: 'bad body'
            },
            {
                local: '身体长',
                raw: 'long body'
            },
            {
                local: '肥胖',
                raw: '(fat:1.2)'
            },
            {
                local: '长颈',
                raw: 'long neck'
            },
            {
                local: '畸形',
                raw: 'deformed'
            },
            {
                local: '变异的',
                raw: 'mutated'
            },
            {
                local: '变异',
                raw: 'mutation'
            },
            {
                local: '丑陋',
                raw: 'ugly'
            },
            {
                local: '毁容',
                raw: 'disfigured'
            },
            {
                local: '画的不好的脸',
                raw: 'poorly drawn face'
            },
            {
                local: '皮肤瑕疵',
                raw: 'skin blemishes'
            },
            {
                local: '皮肤斑点',
                raw: 'skin spots'
            },
            {
                local: '痤疮',
                raw: 'acnes'
            },
            {
                local: '缺少肢体',
                raw: 'missing limb'
            },
            {
                local: '畸形的肢体',
                raw: 'malformed limbs'
            },
            {
                local: '漂浮的肢体',
                raw: 'floating limbs'
            },
            {
                local: '肢体不连贯',
                raw: 'disconnected limbs'
            },
            {
                local: '多余的肢体',
                raw: 'extra limb'
            },
            {
                local: '多余的手臂',
                raw: 'extra arms'
            },
            {
                local: '变异的手',
                raw: 'mutated hands'
            },
            {
                local: '画的不好的手',
                raw: 'poorly drawn hands'
            },
            {
                local: '畸形的手',
                raw: 'malformed hands'
            },
            {
                local: '畸形的手和手指',
                raw: 'mutated hands and fingers'
            },
            {
                local: '坏手',
                raw: 'bad hands'
            },
            {
                local: '缺少手指',
                raw: 'missing fingers'
            },
            {
                local: '融合的手指',
                raw: 'fused fingers'
            },
            {
                local: '太多手指',
                raw: 'too many fingers'
            },
            {
                local: '多余的腿',
                raw: 'extra legs'
            },
            {
                local: '坏脚',
                raw: 'bad feet'
            },
            {
                local: '斗鸡眼',
                raw: 'cross-eyed'
            }
        ],
        Embeddings: [
            {
                local: null,
                raw: 'AS-YoungV2-neg'
            },
            {
                local: null,
                raw: 'BadDream'
            },
            {
                local: null,
                raw: 'badhandv4'
            },
            {
                local: null,
                raw: 'BadNegAnatomyV1-neg'
            },
            {
                local: null,
                raw: 'EasyNegative'
            },
            {
                local: null,
                raw: 'FastNegativeV2'
            }
        ]
    }
};
class TagsStroage {
    tags_obj;
    ItemName;
    constructor(localStorageItemName) {
        this.ItemName = localStorageItemName;
        const loaded = this.loadFromLocalStroage();

        if (loaded != null) {
            this.tags_obj = convertToMap(JSON.parse(loaded));
        } else {
            this.tags_obj = convertToMap(obj_tags);
        }
    }
    reset() {
        this.tags_obj = convertToMap(JSON.parse(JSON.stringify(obj_tags)));
        return this.tags_obj;
    }
    TAGS() {
        return this.tags_obj;
    }
    update(tags_obj) {
        this.tags_obj = tags_obj;
    }
    updateFromObject(raw_obj) {
        this.tags_obj = convertToMap(raw_obj);
    }
    saveToLocalStroage() {
        localStorage.setItem(this.ItemName, JSON.stringify(convertToObject(this.tags_obj)));
    }
    loadFromLocalStroage() {
        return localStorage.getItem(this.ItemName);
    }
}
const tags = new TagsStroage('Tags_v1');

export { tags, convertToObject };
