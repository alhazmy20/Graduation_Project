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
                    <h1>تحديث حالة المنشأة: </h1>
                    @if ($activationStatus == 1)
                        <p>نود إبلاغكم بأنه تم تنشيط حساب المنشأة وبإمكانكم الدخول للمنصة وإضافة فرص تدريبية.</p>
                        <table class="action" align="center" width="100%" cellpadding="0"
                            cellspacing="0"role="presentation">
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <table width="100%" border="0"
                                            cellpadding="0"cellspacing="0"role="presentation">
                                            <tbody>
                                                <tr>
                                                    <td align="center">
                                                        <table border="0" cellpadding="0"
                                                            cellspacing="0"role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <a
                                                                            href="https://tadreebi-platform.netlify.app/login"class="button button-primary">انقر
                                                                            هنا للذهاب إلى المنصة</a>
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
                    @endif
                    @if ($activationStatus == 0)
                        <p>نود إبلاغكم بأنه تم الغاء تنشيط حساب المنشأة ، يرجى مراجعة مشرفين المنصة لمعرفة اسباب الغاء التنشيط.</p>
                    @endif
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
