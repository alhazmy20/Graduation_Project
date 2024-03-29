<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <center class="wrapper">
        <div class="content">
            <table class="header">
                <tr>
                    <td>
                        <a href="#">
                            <img class="logo" src="https://www9.0zz0.com/2023/04/09/03/714496061.png" alt="Logo">
                        </a>
                    </td>
                </tr>
            </table>
            <table>
                <td class="content-cell inner-body">
                    <h1>تحديث حالة الطلب: </h1>
                    <p>نود إبلاغكم بأنه تم تحديث حالة الطلب في الفرصة التدريبية التالية <b>{{ $postName }}</b> إلى <b>{{ $newStatus }}</b></p>
                    @if($newStatus === 'بإنتظار موافقة الطالب')
                    <p><b style="color: red">تنبيه : </b>في حال عدم القبول او الرفض خلال <b>48 ساعة </b>سيتم الغاء الطلب تلقائيا من قبل النظام.</p>
                    @endif
                    <p><b></b></p>
                    <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0"role="presentation">
                        <tbody>
                            <tr>
                                <td align="center">
                                    <table width="100%" border="0" cellpadding="0"cellspacing="0"role="presentation">
                                        <tbody>
                                            <tr>
                                                <td align="center">
                                                    <table border="0" cellpadding="0" cellspacing="0"role="presentation">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <a href="https://tadreebi-platform.netlify.app/student/applications"class="button button-primary">انقر هنا للذهاب إلى طلباتي</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <table class="subcopy">
                    <tr>
                        <td class="content-cell">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>جميع الحقوق محفوظة لمنصة تدريبي &copy; {{ date('Y') }}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </table>
        </div>
    </center>
</body>

</html>
