package com.cosog.model;

public class AlarmShowStyle implements java.io.Serializable {
	
	public AlarmShowStyle() {
		this.Overview=new AlarmLevelStyle();
		this.Details=new AlarmLevelStyle();
		this.Statistics=new AlarmLevelStyle();
		
		this.Overview.setNormal(new AlarmStyle());
		this.Overview.setFirstLevel(new AlarmStyle());
		this.Overview.setSecondLevel(new AlarmStyle());
		this.Overview.setThirdLevel(new AlarmStyle());
		
		this.Details.setNormal(new AlarmStyle());
		this.Details.setFirstLevel(new AlarmStyle());
		this.Details.setSecondLevel(new AlarmStyle());
		this.Details.setThirdLevel(new AlarmStyle());
		
		this.Statistics.setNormal(new AlarmStyle());
		this.Statistics.setFirstLevel(new AlarmStyle());
		this.Statistics.setSecondLevel(new AlarmStyle());
		this.Statistics.setThirdLevel(new AlarmStyle());
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private AlarmLevelStyle Overview;

	private AlarmLevelStyle Details;
	
	private AlarmLevelStyle Statistics;

    
    
    public static class AlarmLevelStyle{
    	private AlarmStyle Normal;

        private AlarmStyle FirstLevel;

        private AlarmStyle SecondLevel;

        private AlarmStyle ThirdLevel;

		public AlarmStyle getNormal() {
			return Normal;
		}

		public void setNormal(AlarmStyle normal) {
			Normal = normal;
		}

		public AlarmStyle getFirstLevel() {
			return FirstLevel;
		}

		public void setFirstLevel(AlarmStyle firstLevel) {
			FirstLevel = firstLevel;
		}

		public AlarmStyle getSecondLevel() {
			return SecondLevel;
		}

		public void setSecondLevel(AlarmStyle secondLevel) {
			SecondLevel = secondLevel;
		}

		public AlarmStyle getThirdLevel() {
			return ThirdLevel;
		}

		public void setThirdLevel(AlarmStyle thirdLevel) {
			ThirdLevel = thirdLevel;
		}
    }
	
	public static class AlarmStyle
	{
	    private int Value;

	    private String BackgroundColor;
	    
	    private String Color;
	    
	    private String Opacity;

	    private String FontStyle;

	    public void setValue(int Value){
	        this.Value = Value;
	    }
	    public int getValue(){
	        return this.Value;
	    }
	    public void setBackgroundColor(String BackgroundColor){
	        this.BackgroundColor = BackgroundColor;
	    }
	    public String getBackgroundColor(){
	        return this.BackgroundColor;
	    }
	    public void setFontStyle(String FontStyle){
	        this.FontStyle = FontStyle;
	    }
	    public String getFontStyle(){
	        return this.FontStyle;
	    }
		public String getColor() {
			return Color;
		}
		public void setColor(String color) {
			Color = color;
		}
		public String getOpacity() {
			return Opacity;
		}
		public void setOpacity(String opacity) {
			Opacity = opacity;
		}
	}

	public AlarmLevelStyle getOverview() {
		return Overview;
	}

	public void setOverview(AlarmLevelStyle overview) {
		Overview = overview;
	}

	public AlarmLevelStyle getDetails() {
		return Details;
	}

	public void setDetails(AlarmLevelStyle details) {
		Details = details;
	}

	public AlarmLevelStyle getStatistics() {
		return Statistics;
	}

	public void setStatistics(AlarmLevelStyle statistics) {
		Statistics = statistics;
	}
}