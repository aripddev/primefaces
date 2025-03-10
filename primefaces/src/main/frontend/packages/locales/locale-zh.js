if (window.PrimeFaces) {
  /* Simplified Chinese (zh-CN) Language | Written by IKKI | 2021-12-25 */
  PrimeFaces.locales["zh"] = {
    accept: "是",
    addRule: "添加规则",
    am: "上午",
    apply: "应用",
    cancel: "取消",
    choose: "选择",
    chooseDate: "选择日期",
    chooseMonth: "选择月份",
    chooseYear: "选择年份",
    clear: "清除",
    completed: "已完成",
    contains: "包含",
    custom: "自定义",
    dateAfter: "日期晚于",
    dateBefore: "日期早于",
    dateFormat: "yy/mm/dd",
    dateIs: "日期为",
    dateIsNot: "日期不为",
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    emptyFilterMessage: "未找到结果",
    emptyMessage: "无可用选项",
    emptySearchMessage: "未找到结果",
    emptySelectionMessage: "未选择任何项",
    endsWith: "以...结尾",
    equals: "等于",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    filter: "筛选",
    firstDayOfWeek: 0,
    gt: "大于",
    gte: "大于等于",
    lt: "小于",
    lte: "小于等于",
    matchAll: "全部匹配",
    matchAny: "任意匹配",
    medium: "中",
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    nextDecade: "下一个十年",
    nextHour: "下一小时",
    nextMinute: "下一分钟",
    nextMonth: "下个月",
    nextSecond: "下一秒",
    nextYear: "下一年",
    noFilter: "无筛选",
    notContains: "不包含",
    notEquals: "不等于",
    now: "现在",
    passwordPrompt: "输入密码",
    pending: "待处理",
    pm: "下午",
    prevDecade: "上一个十年",
    prevHour: "上一小时",
    prevMinute: "上一分钟",
    prevMonth: "上个月",
    prevSecond: "上一秒",
    prevYear: "上一年",
    reject: "否",
    removeRule: "移除规则",
    searchMessage: "有 {0} 条结果可用",
    selectionMessage: "已选择 {0} 项",
    showMonthAfterYear: true,
    startsWith: "以...开始",
    strong: "强",
    today: "今天",
    upload: "上传",
    weak: "弱",
    weekHeader: "周",
    aria: {
      cancelEdit: "取消编辑",
      close: "关闭",
      collapseLabel: "折叠",
      collapseRow: "折叠行",
      editRow: "编辑行",
      expandLabel: "展开",
      expandRow: "展开行",
      falseLabel: "否",
      filterConstraint: "筛选条件",
      filterOperator: "筛选运算符",
      firstPageLabel: "首页",
      gridView: "网格视图",
      hideFilterMenu: "隐藏筛选菜单",
      jumpToPageDropdownLabel: "跳至页面下拉框",
      jumpToPageInputLabel: "跳至页面输入框",
      lastPageLabel: "尾页",
      listView: "列表视图",
      moveAllToSource: "全部移至源",
      moveAllToTarget: "全部移至目标",
      moveBottom: "移至底部",
      moveDown: "下移",
      moveTop: "移至顶部",
      moveToSource: "移至源",
      moveToTarget: "移至目标",
      moveUp: "上移",
      navigation: "导航",
      next: "下一个",
      nextPageLabel: "下一页",
      nullLabel: "未选择",
      otpLabel: "请输入一次性密码字符 {0}",
      pageLabel: "{page}",
      passwordHide: "隐藏密码",
      passwordShow: "显示密码",
      previous: "上一个",
      prevPageLabel: "上一页",
      rotateLeft: "向左旋转",
      rotateRight: "向右旋转",
      rowsPerPageLabel: "每页行数",
      saveEdit: "保存编辑",
      scrollTop: "滚动到顶部",
      selectAll: "已选择所有项目",
      selectLabel: "选择",
      selectRow: "选择行",
      showFilterMenu: "显示筛选菜单",
      slide: "滑动",
      slideNumber: "{slideNumber}",
      star: "1颗星",
      stars: "{star}颗星",
      trueLabel: "是",
      unselectAll: "全部取消选择",
      unselectLabel: "取消选择",
      unselectRow: "取消选择行",
      zoomImage: "查看大图",
      zoomIn: "放大",
      zoomOut: "缩小",
    },
  };

  // custom PF labels
  PrimeFaces.locales["zh"] = $.extend(true, {}, PrimeFaces.locales["zh"], {
    allDayText: "全天",
    day: "日",
    hourText: "时",
    isRTL: false,
    list: "列表",
    millisecondText: "毫秒",
    minuteText: "分",
    month: "月",
    moreLinkText: "更多...",
    noEventsText: "无活动",
    secondText: "秒",
    timeOnlyTitle: "仅时间",
    timeText: "时间",
    unexpectedError: "意外的错误",
    week: "周",
    weekNumberTitle: "周",
    year: "年",
    yearSuffix: "",
    aria: {
      "colorpicker.ALPHASLIDER": "不透明度滑块",
      "colorpicker.CLEAR": "清除选定的颜色",
      "colorpicker.CLOSE": "关闭颜色选择器",
      "colorpicker.FORMAT": "颜色格式",
      "colorpicker.HUESLIDER": "色相滑块",
      "colorpicker.INPUT": "颜色值字段",
      "colorpicker.INSTRUCTION": "饱和度和亮度选择器。使用上、下、左、右箭头键进行选择。",
      "colorpicker.MARKER": "饱和度：{s}。亮度：{v}。",
      "colorpicker.OPEN": "打开颜色选择器",
      "colorpicker.SWATCH": "色样",
      "datatable.sort.ASC": "升序排列",
      "datatable.sort.DESC": "降序排列",
      "datatable.sort.NONE": "无序排列",
      "messages.ERROR": "错误",
      "messages.FATAL": "严重错误",
      "messages.INFO": "信息",
      "messages.WARN": "警告",
      "spinner.DECREASE": "减少价值",
      "spinner.INCREASE": "增加价值",
      "switch.OFF": "关",
      "switch.ON": "开",
    },
    messages: {
      "jakarta.faces.component.UIInput.REQUIRED": "验证失败！“{0}”是必填项！",
      "jakarta.faces.converter.BigDecimalConverter.DECIMAL": "{2}：“{0}”必须是大浮点数型！",
      "jakarta.faces.converter.BigDecimalConverter.DECIMAL_detail": "{2}：“{0}”必须是不可变的有符号的任意精度的浮点数！后面可能跟小数点和分数。例如：{1}。",
      "jakarta.faces.converter.BigIntegerConverter.BIGINTEGER": "{2}：“{0}”必须是大整数型！",
      "jakarta.faces.converter.BigIntegerConverter.BIGINTEGER_detail": "{2}：“{0}”必须是不可变的任意精度的整数！例如：{1}。",
      "jakarta.faces.converter.BooleanConverter.BOOLEAN": "{1}：“{0}”必须是布尔型！",
      "jakarta.faces.converter.BooleanConverter.BOOLEAN_detail": "{1}：“{0}”必须是“true”或者“false”！“true”以外的任何值都将被视为“false”。",
      "jakarta.faces.converter.ByteConverter.BYTE": "{2}：“{0}”必须是字节型！",
      "jakarta.faces.converter.ByteConverter.BYTE_detail": "{2}：“{0}”必须是负2的7次方到2的7次方减1之间的整数！例如：{1}。",
      "jakarta.faces.converter.CharacterConverter.CHARACTER": "{1}：“{0}”必须是字符型！",
      "jakarta.faces.converter.CharacterConverter.CHARACTER_detail": "{1}：“{0}”必须是一个有效的ASCII字符。",
      "jakarta.faces.converter.DateTimeConverter.DATE": "{2}：“{0}”必须是日期型！",
      "jakarta.faces.converter.DateTimeConverter.DATE_detail": "{2}：“{0}”必须是有效的日期数据类型！例如：{1}。",
      "jakarta.faces.converter.DateTimeConverter.DATETIME": "{2}：“{0}”必须是日期时间型！",
      "jakarta.faces.converter.DateTimeConverter.DATETIME_detail": "{2}：“{0}”必须是有效的日期时间数据类型！例如：{1}。",
      "jakarta.faces.converter.DateTimeConverter.PATTERN_TYPE": "{1}：必须指定“格式”或“类型”属性才能转换“{0}”。",
      "jakarta.faces.converter.DateTimeConverter.TIME": "{2}：“{0}”必须是时间型！",
      "jakarta.faces.converter.DateTimeConverter.TIME_detail": "{2}：“{0}”必须是有效的时间数据类型！例如：{1}。",
      "jakarta.faces.converter.DoubleConverter.DOUBLE": "{2}：“{0}”必须是双精度浮点型！",
      "jakarta.faces.converter.DoubleConverter.DOUBLE_detail": "{2}：“{0}”必须是4.9E-324到1.7976931348623157E308之间的浮点数！例如：{1}。",
      "jakarta.faces.converter.FloatConverter.FLOAT": "{2}：“{0}”必须是单精度浮点型！",
      "jakarta.faces.converter.FloatConverter.FLOAT_detail": "{2}：“{0}”必须是1.4E-45到3.4028235E38之间的浮点数！例如：{1}。",
      "jakarta.faces.converter.IntegerConverter.INTEGER": "{2}：“{0}”必须是整型！",
      "jakarta.faces.converter.IntegerConverter.INTEGER_detail": "{2}：“{0}”必须是负2的31次方到2的31次方减1之间的整数！例如：{1}。",
      "jakarta.faces.converter.LongConverter.LONG": "{2}：“{0}”必须是长整型！",
      "jakarta.faces.converter.LongConverter.LONG_detail": "{2}：“{0}”必须是负2的63次方到2的63次方减1之间的整数！例如：{1}。",
      "jakarta.faces.converter.NumberConverter.CURRENCY": "{2}：“{0}”必须是货币值型！",
      "jakarta.faces.converter.NumberConverter.CURRENCY_detail": "{2}：“{0}”必须是有效的货币值数据类型！例如：{1}.",
      "jakarta.faces.converter.NumberConverter.NUMBER": "{2}：“{0}”必须是数字型！",
      "jakarta.faces.converter.NumberConverter.NUMBER_detail": "{2}：“{0}”必须是有效的数字数据类型！例如：{1}.",
      "jakarta.faces.converter.NumberConverter.PATTERN": "{2}：“{0}”必须是数字格式！",
      "jakarta.faces.converter.NumberConverter.PATTERN_detail": "{2}：“{0}”必须是有效的数字格式数据类型！例如：{1}.",
      "jakarta.faces.converter.NumberConverter.PERCENT": "{2}：“{0}”必须是百分比型！",
      "jakarta.faces.converter.NumberConverter.PERCENT_detail": "{2}：“{0}”必须是有效的百分比数据类型！例如：{1}.",
      "jakarta.faces.converter.ShortConverter.SHORT": "{2}：“{0}”必须是短整型！",
      "jakarta.faces.converter.ShortConverter.SHORT_detail": "{2}：“{0}”必须是负2的15次方到2的15次方减1之间的整数！例如：{1}。",
      "jakarta.faces.validator.BeanValidator.MESSAGE": "{1}: {0}",
      "jakarta.faces.validator.DoubleRangeValidator.MAXIMUM": "{1}：验证失败！值大于允许的最大值“{0}”。",
      "jakarta.faces.validator.DoubleRangeValidator.MINIMUM": "{1}：验证失败！值小于允许的最小值“{0}”。",
      "jakarta.faces.validator.DoubleRangeValidator.NOT_IN_RANGE": "{2}：验证失败！值不在“{0}和“{1}”之间。",
      "jakarta.faces.validator.DoubleRangeValidator.TYPE": "{0}: 验证失败！值的类型不正确。",
      "jakarta.faces.validator.LengthValidator.MAXIMUM": "{1}：验证失败！长度大于允许的最大值“{0}”。",
      "jakarta.faces.validator.LengthValidator.MINIMUM": "{1}：验证失败！长度小于允许的最小值“{0}”。",
      "jakarta.faces.validator.LongRangeValidator.MAXIMUM": "{1}：验证失败！值大于允许的最大值“{0}”。",
      "jakarta.faces.validator.LongRangeValidator.MINIMUM": "{1}：验证失败！值小于允许的最小值“{0}”。",
      "jakarta.faces.validator.LongRangeValidator.NOT_IN_RANGE": "{2}：验证失败！值不在“{0}”和“{1}”之间。",
      "jakarta.faces.validator.LongRangeValidator.TYPE": "{0}: 验证失败！值的类型不正确。",
      "jakarta.faces.validator.RegexValidator.MATCH_EXCEPTION": "正则表达式错误！",
      "jakarta.faces.validator.RegexValidator.MATCH_EXCEPTION_detail": "“{0}”的正则表达式错误！",
      "jakarta.faces.validator.RegexValidator.NOT_MATCHED": "正则表达式格式不匹配！",
      "jakarta.faces.validator.RegexValidator.NOT_MATCHED_detail": "“{0}”的正则表达式格式不匹配！",
      "jakarta.faces.validator.RegexValidator.PATTERN_NOT_SET": "必须设置正则表达式格式！",
      "jakarta.faces.validator.RegexValidator.PATTERN_NOT_SET_detail": "正则表达式格式必须设置为非空值！",
      "jakarta.validatio.constraints.AssertFalse.message": "必定是假的",
      "jakarta.validatio.constraints.AssertTrue.message": "必须是真的",
      "jakarta.validatio.constraints.DecimalMax.message": "必须小于或等于 {0}",
      "jakarta.validatio.constraints.DecimalMin.message": "必须大于或等于 {0}",
      "jakarta.validatio.constraints.Digits.message": "数值超出范围（应为 &lt;{0} 位数字&gt;.&lt;{1} 位数字&gt;）",
      "jakarta.validatio.constraints.Email.message": "必须是格式正确的电子邮件地址",
      "jakarta.validatio.constraints.Future.message": "必须是未来日期",
      "jakarta.validatio.constraints.FutureOrPresent.message": "必须是现在或将来的日期",
      "jakarta.validatio.constraints.Max.message": "必须小于或等于 {0}",
      "jakarta.validatio.constraints.Min.message": "必须大于或等于 {0}",
      "jakarta.validatio.constraints.Negative.message": "必须小于 0",
      "jakarta.validatio.constraints.NegativeOrZero.message": "必须小于或等于 0",
      "jakarta.validatio.constraints.NotBlank.message": "不能为空",
      "jakarta.validatio.constraints.NotEmpty.message": "不能为空",
      "jakarta.validatio.constraints.NotNull.message": "不能为空",
      "jakarta.validatio.constraints.Null.message": "必须为空",
      "jakarta.validatio.constraints.Past.message": "必须是过去的日期",
      "jakarta.validatio.constraints.PastOrPresent.message": "必须是过去或现在的日期",
      "jakarta.validatio.constraints.Pattern.message": "必须匹配“{0}”",
      "jakarta.validatio.constraints.Positive.message": "必须大于 0",
      "jakarta.validatio.constraints.PositiveOrZero.message": "必须大于或等于 0",
      "jakarta.validatio.constraints.Size.message": "尺寸必须介于 {0} 和 {1} 之间",
      "primefaces.FileValidator.ALLOW_TYPES": "无效的文件类型。",
      "primefaces.FileValidator.ALLOW_TYPES_detail": "无效的文件类型：'{0}'。允许的类型：'{1}'。",
      "primefaces.FileValidator.FILE_LIMIT": "超出最大文件数。",
      "primefaces.FileValidator.FILE_LIMIT_detail": "最大数量：{0}。",
      "primefaces.FileValidator.SIZE_LIMIT": "文件大小无效。",
      "primefaces.FileValidator.SIZE_LIMIT_detail": "文件“{0}”不得大于 {1}。",
    },
  });
  PrimeFaces.locales["zh_CN"] = PrimeFaces.locales["zh"];

  /* Traditional Chinese (zh_TW) */
  PrimeFaces.locales["zh_TW"] = $.extend(true, {}, PrimeFaces.locales["zh"], {
    accept: "是",
    addRule: "增加規則",
    am: "上午",
    apply: "應用",
    cancel: "取消",
    choose: "選擇",
    chooseDate: "選擇日期",
    chooseMonth: "選擇月份",
    chooseYear: "選擇年份",
    clear: "清除",
    completed: "已完成",
    contains: "包含",
    custom: "自訂義",
    dateAfter: "日期晚於",
    dateBefore: "日期早於",
    dateFormat: "yy/mm/dd",
    dateIs: "日期為",
    dateIsNot: "日期不為",
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    emptyFilterMessage: "無相關篩選結果",
    emptyMessage: "無可用選項",
    emptySearchMessage: "無相關搜尋結果",
    emptySelectionMessage: "無選取項目",
    endsWith: "以...結束",
    equals: "等於",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    filter: "篩選",
    firstDayOfWeek: 0,
    gt: "大於",
    gte: "大於或等於",
    lt: "小於",
    lte: "小於或等於",
    matchAll: "全部匹配",
    matchAny: "任意匹配",
    medium: "中",
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
    nextDecade: "下一個十年",
    nextHour: "下一個小時",
    nextMinute: "下一分鐘",
    nextMonth: "下一個月",
    nextSecond: "下一秒",
    nextYear: "下一年",
    noFilter: "不篩選",
    notContains: "不包含",
    notEquals: "不等於",
    now: "現在",
    passwordPrompt: "輸入一組密碼",
    pending: "待定",
    pm: "下午",
    prevDecade: "上一個十年",
    prevHour: "上一個小時",
    prevMinute: "上一分鐘",
    prevMonth: "上一個月",
    prevSecond: "上一秒",
    prevYear: "上一年",
    reject: "否",
    removeRule: "移除規則",
    searchMessage: "{0} 個相關結果",
    selectionMessage: "{0} 個項目被選取",
    showMonthAfterYear: true,
    startsWith: "以...開始",
    strong: "強",
    today: "今日",
    upload: "上傳",
    weak: "弱",
    weekHeader: "周",
    aria: {
      cancelEdit: "取消編輯",
      close: "關閉",
      collapseLabel: "收合",
      collapseRow: "收合行",
      editRow: "編輯行",
      expandLabel: "展開",
      expandRow: "展開行",
      falseLabel: "否",
      filterConstraint: "篩選條件",
      filterOperator: "篩選運算子",
      firstPageLabel: "第一頁",
      gridView: "網格視圖",
      hideFilterMenu: "隱藏篩選選單",
      jumpToPageDropdownLabel: "跳至頁面下拉選單",
      jumpToPageInputLabel: "跳至頁面輸入欄位",
      lastPageLabel: "最後一頁",
      listView: "列表視圖",
      moveAllToSource: "全部移動至來源",
      moveAllToTarget: "全部移動至目標",
      moveBottom: "移動至底端",
      moveDown: "往下移動",
      moveTop: "移動至頂端",
      moveToSource: "移動至來源",
      moveToTarget: "移動至目標",
      moveUp: "往上移動",
      navigation: "轉導",
      next: "下一個",
      nextPageLabel: "下一頁",
      nullLabel: "未選擇",
      otpLabel: "請輸入一次性密碼字元 {0}",
      pageLabel: "{page}",
      passwordHide: "隱藏密碼",
      passwordShow: "顯示密碼",
      previous: "上一個",
      prevPageLabel: "上一頁",
      rotateLeft: "向左旋轉",
      rotateRight: "向右旋轉",
      rowsPerPageLabel: "每頁行數",
      saveEdit: "儲存編輯",
      scrollTop: "滾動至頂端",
      selectAll: "已選取所有項目",
      selectLabel: "選擇",
      selectRow: "選取行",
      showFilterMenu: "展示篩選選單",
      slide: "滑動",
      slideNumber: "{slideNumber}",
      star: "1 顆星",
      stars: "{star} 顆星",
      trueLabel: "是",
      unselectAll: "已取消選取所有項目",
      unselectLabel: "取消選擇",
      unselectRow: "取消選取行",
      zoomImage: "放大圖片",
      zoomIn: "放大",
      zoomOut: "縮小",
    },
  });
}
