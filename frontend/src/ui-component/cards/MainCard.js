import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';


// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      courseName,
      contentSX = {},
      headerSX = {
        '& .MuiCardHeader-action': { mr: 0 }
      },
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      onClick , 
      buttonText,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <div>
        <Card
          ref={ref}
          {...others}
          sx={{
            border: border ? '1px solid' : 'none',
            borderColor: theme.palette.primary[200] + 25,
            ':hover': {
              boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
            },
            ...sx
          }}
        >
          {/* card header and action */}
          {title && (
            <CardHeader
              sx={{ ...headerSX, display: 'inline-flex' }}
              title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
              action={secondary}
            />
          )}
          {courseName && (
            <div className='m-[25px] my-[40px] text-[30px] font-bold'>
              {courseName}
            </div>          )}
          {buttonText  && (
            <Button variant="contained" color="primary" onClick={onClick}>
              {buttonText}
            </Button>
          )}
          {/* content & header divider */}
          {title   && <Divider />}
          {courseName   && <Divider />}

          {/* card content */}
          {content && (
            <CardContent sx={contentSX} className={contentClass}>
              {children}
            </CardContent>
          )}
          {!content && children}
        </Card>
      </div>
    );
  }
);

MainCard.displayName = 'MainCard';

MainCard.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  courseName: PropTypes.string,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  headerSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
